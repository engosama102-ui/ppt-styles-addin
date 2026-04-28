# 🚀 دليل التثبيت السريع

## الخطوات الأساسية (5 دقائق):

### 1️⃣ رفع على GitHub
```bash
# أنشئ repository جديد على GitHub باسم: ppt-styles-addin
# ارفع كل الملفات
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ppt-styles-addin.git
git push -u origin main
```

### 2️⃣ تفعيل GitHub Pages
- Settings → Pages
- Source: main branch
- Save

### 3️⃣ تعديل Manifest
افتح `manifest.xml` واستبدل:
- `YOUR-GITHUB-USERNAME` → اسمك على GitHub
- `12345678-1234-1234-1234-123456789abc` → GUID جديد من https://www.uuidgenerator.net/

### 4️⃣ إنشاء الأيقونات
ضع أيقونات PNG في مجلد `assets/`:
- icon-16.png (16×16px)
- icon-32.png (32×32px)  
- icon-64.png (64×64px)
- icon-80.png (80×80px)

💡 استخدم https://favicon.io/ لإنشاء الأيقونات بسرعة

### 5️⃣ تثبيت في PowerPoint (Mac)
1. حمّل `manifest.xml`
2. PowerPoint → Insert → Add-ins → My Add-ins
3. Manage My Add-ins (⚙️) → Add from file
4. اختر `manifest.xml`
5. Install ✅

---

## الروابط المهمة بعد الرفع:

- **الموقع:** `https://YOUR-USERNAME.github.io/ppt-styles-addin/`
- **Manifest:** `https://YOUR-USERNAME.github.io/ppt-styles-addin/manifest.xml`
- **Taskpane:** `https://YOUR-USERNAME.github.io/ppt-styles-addin/src/taskpane.html`

---

## اختبار التثبيت:
بعد التثبيت، افتح PowerPoint وابحث عن:
- زر "مدير الأنماط" في تبويب Home
- أو Insert → My Add-ins → PowerPoint Styles Manager

✅ إذا ظهر = نجح التثبيت!
❌ إذا لم يظهر = راجع README.md للحلول

---

**محتاج مساعدة؟** راجع `README.md` للتعليمات التفصيلية