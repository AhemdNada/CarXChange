// Mobile Menu Toggle
const burgerButton = document.getElementById('mobile-menu-button');
const menuList = document.getElementById('mobile-menu');

burgerButton.addEventListener('click', () => {
    const isOpen = burgerButton.getAttribute('aria-expanded') === 'true';
    burgerButton.setAttribute('aria-expanded', !isOpen);
    menuList.classList.toggle('hidden');
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', (event) => {
    if (!menuList.contains(event.target) && !burgerButton.contains(event.target)) {
        menuList.classList.add('hidden');
        burgerButton.setAttribute('aria-expanded', 'false');
    }
});

document.querySelector('a[href="#AboutUs"]').addEventListener('click', function(e) {
    e.preventDefault();  // منع الانتقال التلقائي

    // التأكد من أن الـ section موجود في الصفحة الحالية أو في صفحة أخرى
    const targetPage = "index.html";  // اسم الصفحة التي تحتوي على الـ section
    const sectionId = "#AboutUs";

    window.location.href = targetPage + sectionId;  // التوجيه إلى الصفحة والـ section
});




