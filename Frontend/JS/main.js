// start sellcar.html js --->
// Start featching data model and brands 
// جلب بيانات CSV
async function loadCarsData() {
    const response = await fetch('cars.csv');
    const data = await response.text();
    
    // تحويل CSV إلى مصفوفة كائنات
    const cars = [];
    const rows = data.split('\n').slice(1); // تجاهل الصف الأول (العناوين)
    
    rows.forEach(row => {
        const [brand, model] = row.split(',');
        if (brand && model) {
            cars.push({ 
                brand: brand.trim(), 
                model: model.trim() 
            });
        }
    });
    
    return cars;
}

// تعبئة قائمة العلامات التجارية
async function populateBrands() {
    const cars = await loadCarsData();
    const brandSelect = document.getElementById('brand');
    
    // استخراج العلامات التجارية الفريدة
    const uniqueBrands = [...new Set(cars.map(car => car.brand))];
    
    uniqueBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });
}

// تعبئة الموديلات بناءً على العلامة المختارة
function populateModels(selectedBrand) {
    const modelSelect = document.getElementById('model');
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    
    loadCarsData().then(cars => {
        const filteredModels = cars
            .filter(car => car.brand === selectedBrand)
            .map(car => car.model);
        
        const uniqueModels = [...new Set(filteredModels)];
        
        uniqueModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    });
}

// الأحداث
document.addEventListener('DOMContentLoaded', () => {
    populateBrands();
    
    document.getElementById('brand').addEventListener('change', function() {
        if (this.value) {
            populateModels(this.value);
        }
    });
});

// End featching data model and brands 


// Start Color script for cusmiz or select color 

// List of Basic Colors
const colors = [
    '#FF0000',  // Red
    '#0000FF',  // Blue
    '#FFFF00',  // Yellow
    '#000000',  // Black
    '#FFFFFF',  // White
    '#A52A2A',  // Brown
    '#808080'   // Gray
];

// Add Basic Color Buttons
const colorGrid = document.getElementById('colorGrid');

colors.forEach(color => {
    const btn = document.createElement('button');
    btn.type = 'button'; 
    btn.className = 'h-10 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-200 relative overflow-hidden shadow-sm';
    btn.style.backgroundColor = color;
    btn.title = color;

    btn.addEventListener('click', (e) => {
        e.preventDefault(); 
        selectColor(color, btn);
    });

    // checkmark overlay
    const check = document.createElement('div');
    check.className = 'absolute inset-0 hidden items-center justify-center bg-black bg-opacity-30';
    check.innerHTML = '<i class="fas fa-check text-white text-xl"></i>';
    btn.appendChild(check);

    colorGrid.appendChild(btn);
});

// Select Color Function
function selectColor(color, element) {
    document.querySelectorAll('#colorGrid button').forEach(btn => {
        btn.classList.remove('border-blue-500', 'scale-110');
        btn.querySelector('div').classList.add('hidden');
    });

    element.classList.add('border-blue-500', 'scale-110');
    element.querySelector('div').classList.remove('hidden');
    document.getElementById('selectedColor').value = color;

    // للتجربة
    console.log('Selected color:', color);
}

// Handle Custom Color Selection
document.getElementById('colorPicker').addEventListener('input', (e) => {
    const customColor = e.target.value;
    selectColor(customColor);
});
// End Color script for cusmiz or select color 
// Start Errors message
//location
function validateLocation() {
    const locationInput = document.getElementById('location');
    const errorMessage = document.getElementById('error-message-location');
    const regex = /^[A-Za-z\s]*$/; // Regular expression to allow only English letters and spaces
    locationInput.addEventListener('input', function() {
        if (!regex.test(locationInput.value)) {
            errorMessage.classList.remove('hidden');
        } else {
            errorMessage.classList.add('hidden');
        }
    });
}
//safetyFeatures
//Description 
// KeyFeatures 
let featureCount = 0;
const maxFeatures = 4;

// دالة إضافة ميزة
function addFeature() {
    const title = document.getElementById('featureTitle').value.trim();
    const desc = document.getElementById('featureDesc').value.trim(); // إضافة سطر لالتقاط الوصف

    // التحقق إذا كانت المدخلات تحتوي فقط على الحروف الإنجليزية والمسافات
    const regex = /^[A-Za-z0-9\s]*$/;

    const errorMessage = document.getElementById('error-message-features');
    errorMessage.style.display = "none"; // إخفاء رسالة الخطأ في البداية

    if (!title || !desc) {
        errorMessage.textContent = "Please enter both title and description.";
        errorMessage.style.display = "block";
        return;
    }

    if (!regex.test(title) || !regex.test(desc)) {
        errorMessage.textContent = "Only English letters and spaces are allowed.";
        errorMessage.style.display = "block";
        return;
    }

    if (featureCount >= maxFeatures) {
        errorMessage.textContent = "Maximum of 4 features allowed.";
        errorMessage.style.display = "block";
        return;
    }

    const list = document.getElementById('featuresList');

    const li = document.createElement('li');
    li.className = "flex justify-between items-center bg-gray-100 p-3 rounded-md";
    li.innerHTML = `
        <span><strong>${title}</strong>: ${desc}</span>
        <button onclick="removeFeature(this)" class="text-red-500 hover:text-red-700">
            <i class="fas fa-trash"></i>
        </button>
    `;

    list.appendChild(li);
    featureCount++;

    // Clear inputs
    document.getElementById('featureTitle').value = '';
    document.getElementById('featureDesc').value = ''; // مسح حقل الوصف أيضًا
}

// دالة إزالة ميزة
function removeFeature(button) {
    const li = button.parentElement;
    li.remove();
    featureCount--;
}
// End KeyFeatures 
// End Errors message 


//  start years funcution 
const yearSelect = document.getElementById('year');
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= 2000; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}
//  End years funcution 
// start image upload functions
let images = [];
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const imageCount = document.getElementById('imageCount');
const form = document.getElementById('form');  // تأكد من أن لديك النموذج

imageInput.addEventListener('change', handleImageUpload);
document.getElementById('resetImages').addEventListener('click', resetImages);

// إضافة تحقق عند تقديم النموذج
form.addEventListener('submit', function(e) {
if (images.length < 3) {
e.preventDefault();  // منع تقديم النموذج
alert('Please select at least 3 images');
}
});

function handleImageUpload(e) {
const files = Array.from(e.target.files);
if (images.length + files.length > 12) {
alert('Maximum 12 images allowed');
return;
}

files.forEach(file => {
if (!file.type.startsWith('image/')) return;

const reader = new FileReader();
reader.onload = () => {
    images.push({ file, url: reader.result });
    updateImageDisplay();
};
reader.readAsDataURL(file);
});
}

function updateImageDisplay() {
preview.innerHTML = '';
images.forEach((img, index) => {
const div = document.createElement('div');
div.className = 'relative group aspect-square animate-fade-in';

const imgElement = document.createElement('img');
imgElement.src = img.url;
imgElement.className = 'w-full h-full object-cover rounded-xl shadow-sm transform group-hover:scale-105 transition-transform';

const removeBtn = document.createElement('button');
removeBtn.className = 'absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:bg-red-600';
removeBtn.innerHTML = '<i class="fas fa-times text-xs"></i>';
removeBtn.onclick = () => removeImage(index);

div.appendChild(imgElement);
div.appendChild(removeBtn);
preview.appendChild(div);
});

imageCount.innerHTML = `<i class="fas fa-images mr-2"></i>${images.length}/12 photos selected`;
}

function removeImage(index) {
images.splice(index, 1);
updateImageDisplay();
}

function resetImages() {
images = [];
updateImageDisplay();
}
// End image upload functions


// End sellcar.html js --->


// Start index.html js --->



// End index.html js --->


// Star login.html js --> 
 
// End login.html js --> 
