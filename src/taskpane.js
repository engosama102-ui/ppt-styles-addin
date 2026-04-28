// PowerPoint Styles Manager - Main JavaScript
// يتم تحميله تلقائياً عند فتح الـ Taskpane

let styles = [];

// Initialize Office.js
Office.onReady((info) => {
    if (info.host === Office.HostType.PowerPoint) {
        console.log('PowerPoint Add-in loaded successfully');
        loadStyles();
        setupEventListeners();
        updatePreview();
    }
});

// Setup event listeners
function setupEventListeners() {
    // Update preview on any input change
    const inputs = ['styleName', 'fontName', 'fontSize', 'fontColor', 'fontColorHex', 
                   'fontBold', 'fontItalic', 'fontUnderline', 'textAlign'];
    
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updatePreview);
            element.addEventListener('change', updatePreview);
        }
    });

    // Sync color pickers
    document.getElementById('fontColor').addEventListener('input', (e) => {
        document.getElementById('fontColorHex').value = e.target.value;
        updatePreview();
    });

    document.getElementById('fontColorHex').addEventListener('input', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            document.getElementById('fontColor').value = e.target.value;
            updatePreview();
        }
    });
}

// Load styles from localStorage
function loadStyles() {
    try {
        const savedStyles = localStorage.getItem('pptStyles');
        styles = savedStyles ? JSON.parse(savedStyles) : [];
        renderStyles();
    } catch (error) {
        console.error('Error loading styles:', error);
        styles = [];
    }
}

// Save styles to localStorage
function saveStylesToStorage() {
    try {
        localStorage.setItem('pptStyles', JSON.stringify(styles));
    } catch (error) {
        console.error('Error saving styles:', error);
        showAlert('خطأ في حفظ الأنماط', 'error');
    }
}

// Update preview
function updatePreview() {
    const preview = document.getElementById('stylePreview');
    if (!preview) return;

    const fontName = document.getElementById('fontName').value;
    const fontSize = document.getElementById('fontSize').value;
    const fontColor = document.getElementById('fontColor').value;
    const bold = document.getElementById('fontBold').value === 'true';
    const italic = document.getElementById('fontItalic').value === 'true';
    const underline = document.getElementById('fontUnderline').value === 'true';
    const align = document.getElementById('textAlign').value;

    preview.style.fontFamily = fontName;
    preview.style.fontSize = fontSize + 'px';
    preview.style.color = fontColor;
    preview.style.fontWeight = bold ? 'bold' : 'normal';
    preview.style.fontStyle = italic ? 'italic' : 'normal';
    preview.style.textDecoration = underline ? 'underline' : 'none';
    preview.style.textAlign = align.toLowerCase();
}

// Capture style from selected text in PowerPoint
async function captureStyle() {
    try {
        await PowerPoint.run(async (context) => {
            const selectedShapes = context.presentation.getSelectedShapes();
            const shape = selectedShapes.getItemAt(0);
            
            shape.load('textFrame');
            await context.sync();

            if (!shape.textFrame) {
                showAlert('الشكل المحدد لا يحتوي على نص', 'error');
                return;
            }

            const textRange = shape.textFrame.textRange;
            textRange.load(['font', 'paragraphFormat']);
            await context.sync();

            const font = textRange.font;
            font.load(['name', 'size', 'bold', 'italic', 'underline', 'color']);
            
            const paraFormat = textRange.paragraphFormat;
            paraFormat.load('horizontalAlignment');
            
            await context.sync();

            // Update form with captured values
            document.getElementById('fontName').value = font.name || 'Arial';
            document.getElementById('fontSize').value = Math.round(font.size) || 16;
            document.getElementById('fontBold').value = font.bold ? 'true' : 'false';
            document.getElementById('fontItalic').value = font.italic ? 'true' : 'false';
            document.getElementById('fontUnderline').value = (font.underline !== PowerPoint.ShapeLineStyle.single) ? 'false' : 'true';
            
            // Convert color to hex
            const color = font.color || '#000000';
            document.getElementById('fontColor').value = color;
            document.getElementById('fontColorHex').value = color;

            // Map alignment
            const alignmentMap = {
                [PowerPoint.ParagraphHorizontalAlignment.left]: 'Left',
                [PowerPoint.ParagraphHorizontalAlignment.center]: 'Center',
                [PowerPoint.ParagraphHorizontalAlignment.right]: 'Right',
                [PowerPoint.ParagraphHorizontalAlignment.justify]: 'Justify'
            };
            document.getElementById('textAlign').value = alignmentMap[paraFormat.horizontalAlignment] || 'Right';

            updatePreview();
            showAlert('تم استيراد النمط بنجاح! ✅', 'success');
        });
    } catch (error) {
        console.error('Error capturing style:', error);
        showAlert('خطأ: تأكد من تحديد نص أولاً', 'error');
    }
}

// Save current style
function saveStyle() {
    const styleName = document.getElementById('styleName').value.trim();
    
    if (!styleName) {
        showAlert('يرجى إدخال اسم للنمط', 'error');
        return;
    }

    const style = {
        id: Date.now(),
        name: styleName,
        fontName: document.getElementById('fontName').value,
        fontSize: parseInt(document.getElementById('fontSize').value),
        fontColor: document.getElementById('fontColor').value,
        bold: document.getElementById('fontBold').value === 'true',
        italic: document.getElementById('fontItalic').value === 'true',
        underline: document.getElementById('fontUnderline').value === 'true',
        align: document.getElementById('textAlign').value,
        created: new Date().toISOString()
    };

    styles.push(style);
    saveStylesToStorage();
    
    showAlert('تم حفظ النمط بنجاح! ✅', 'success');
    renderStyles();
    
    // Clear name field
    document.getElementById('styleName').value = '';
}

// Render styles list
function renderStyles() {
    const container = document.getElementById('stylesList');
    
    if (!styles || styles.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                لا توجد أنماط محفوظة<br>
                ابدأ بإنشاء نمط جديد!
            </div>
        `;
        return;
    }

    container.innerHTML = styles.map(style => `
        <div class="style-item">
            <h3>${escapeHtml(style.name)}</h3>
            <div class="style-preview" style="
                font-family: ${style.fontName};
                font-size: ${style.fontSize}px;
                color: ${style.fontColor};
                font-weight: ${style.bold ? 'bold' : 'normal'};
                font-style: ${style.italic ? 'italic' : 'normal'};
                text-decoration: ${style.underline ? 'underline' : 'none'};
                text-align: ${style.align.toLowerCase()};
            ">
                نص تجريبي للمعاينة
            </div>
            <div class="style-details">
                ${style.fontName} • ${style.fontSize}pt
                ${style.bold ? ' • غامق' : ''}
                ${style.italic ? ' • مائل' : ''}
                ${style.underline ? ' • تسطير' : ''}
            </div>
            <div class="style-actions">
                <button class="btn btn-success" onclick="applyStyle(${style.id})">✓ تطبيق</button>
                <button class="btn btn-primary" onclick="editStyle(${style.id})">✏️ تعديل</button>
                <button class="btn btn-danger" onclick="deleteStyle(${style.id})">🗑️ حذف</button>
            </div>
        </div>
    `).join('');
}

// Apply style to selected text
async function applyStyle(id) {
    const style = styles.find(s => s.id === id);
    if (!style) return;

    try {
        await PowerPoint.run(async (context) => {
            const selectedShapes = context.presentation.getSelectedShapes();
            const shapes = selectedShapes.load('items');
            await context.sync();

            if (shapes.items.length === 0) {
                showAlert('لم يتم تحديد أي نص', 'error');
                return;
            }

            for (let shape of shapes.items) {
                shape.load('textFrame');
                await context.sync();

                if (shape.textFrame) {
                    const textRange = shape.textFrame.textRange;
                    const font = textRange.font;
                    const paraFormat = textRange.paragraphFormat;

                    // Apply font properties
                    font.name = style.fontName;
                    font.size = style.fontSize;
                    font.bold = style.bold;
                    font.italic = style.italic;
                    font.underline = style.underline ? PowerPoint.ShapeLineStyle.single : PowerPoint.ShapeLineStyle.notDefined;
                    font.color = style.fontColor;

                    // Apply alignment
                    const alignmentMap = {
                        'Left': PowerPoint.ParagraphHorizontalAlignment.left,
                        'Center': PowerPoint.ParagraphHorizontalAlignment.center,
                        'Right': PowerPoint.ParagraphHorizontalAlignment.right,
                        'Justify': PowerPoint.ParagraphHorizontalAlignment.justify
                    };
                    paraFormat.horizontalAlignment = alignmentMap[style.align] || PowerPoint.ParagraphHorizontalAlignment.right;
                }
            }

            await context.sync();
            showAlert(`تم تطبيق النمط "${style.name}" بنجاح! ✅`, 'success');
        });
    } catch (error) {
        console.error('Error applying style:', error);
        showAlert('خطأ في تطبيق النمط: ' + error.message, 'error');
    }
}

// Edit style
function editStyle(id) {
    const style = styles.find(s => s.id === id);
    if (!style) return;

    document.getElementById('styleName').value = style.name;
    document.getElementById('fontName').value = style.fontName;
    document.getElementById('fontSize').value = style.fontSize;
    document.getElementById('fontColor').value = style.fontColor;
    document.getElementById('fontColorHex').value = style.fontColor;
    document.getElementById('fontBold').value = style.bold.toString();
    document.getElementById('fontItalic').value = style.italic.toString();
    document.getElementById('fontUnderline').value = style.underline.toString();
    document.getElementById('textAlign').value = style.align;

    updatePreview();
    deleteStyle(id, true);
    
    showAlert('قم بتعديل النمط ثم اضغط "حفظ النمط"', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete style
function deleteStyle(id, silent = false) {
    styles = styles.filter(s => s.id !== id);
    saveStylesToStorage();
    
    if (!silent) {
        showAlert('تم حذف النمط', 'success');
    }
    
    renderStyles();
}

// Export styles to JSON
function exportStyles() {
    try {
        const dataStr = JSON.stringify(styles, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ppt-styles-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        showAlert('تم تصدير الأنماط بنجاح!', 'success');
    } catch (error) {
        console.error('Error exporting styles:', error);
        showAlert('خطأ في تصدير الأنماط', 'error');
    }
}

// Import styles
function importStyles() {
    document.getElementById('importFile').click();
}

// Handle import file
function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedStyles = JSON.parse(e.target.result);
            
            if (!Array.isArray(importedStyles)) {
                throw new Error('صيغة الملف غير صحيحة');
            }

            styles = [...styles, ...importedStyles];
            saveStylesToStorage();
            
            renderStyles();
            showAlert(`تم استيراد ${importedStyles.length} نمط بنجاح!`, 'success');
        } catch (error) {
            console.error('Import error:', error);
            showAlert('خطأ في قراءة الملف: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = '';
}

// Show alert message
function showAlert(message, type) {
    const container = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = message;
    
    container.appendChild(alert);
    
    setTimeout(() => {
        alert.style.transition = 'opacity 0.5s';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 500);
    }, 4000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}