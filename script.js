let CategorySectionContainer = document.getElementById('CategorySectionContainer');
let DisplaySection = document.getElementById('DisplaySection');
const baseURL = 'https://fakestoreapi.com/products';
let selectedCategory = null;
let Categories = [];
let AllProducts = [];
let SingleProduct = {};
let newObject = {};
let AddtoCartEvent = document.getElementsByClassName('AddtoCartButton');
let CartProducts = [];
let OverallPurchasingprice=0;
let QtyPerProduct=[];


getCategories();
getAllProducts();


function getCategories() {
    fetch(`${baseURL}/categories`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            Categories = data;
            displayCategories();
        })
        .catch((error) => {
            console.error('Error fetching categories:', error);
        });
}

function displayCategories() {
    Categories.forEach(category => {
        let SingleCategory = document.createElement('p');
        SingleCategory.classList.add('Category');


        SingleCategory.innerHTML = capitalizeFirstLetter(category);
        SingleCategory.setAttribute('id', category);
        SingleCategory.setAttribute('onclick', `filteredDisplay("${category}")`);
        CategorySectionContainer.appendChild(SingleCategory);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}





function getAllProducts() {
    fetch(`${baseURL}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            AllProducts = data;
            displayAllProducts();
        })
        .catch((error) => {
            console.error('Error fetching all products:', error);
        });
}

function displayAllProducts() {
    AllProducts.forEach(product => displaySingleProduct(product));
    // AllProducts.forEach(product => console.log(product));


}
function displaySingleProduct(product) {
    let SingleProduct = document.createElement('div');
    SingleProduct.classList.add('product');
    let ImageContainer = document.createElement('div');
    let ImageGrid = document.createElement('img');
    let productID = document.createElement('p');
    let title = document.createElement('p');
    let price = document.createElement('p');
    let description = document.createElement('p');
    let category = document.createElement('p');
    let rating = document.createElement('p');
    let count = document.createElement('p');
    let AddtoCartButton = document.createElement('button');
    let DeleteProduct = document.createElement('button');




    ImageContainer.classList.add('product-img-cont');
    ImageGrid.classList.add('product-img');
    productID.classList.add('productID');
    title.classList.add('title');
    price.classList.add('price');
    description.classList.add('description');
    category.classList.add('category');
    rating.classList.add('rating');
    count.classList.add('count');
    AddtoCartButton.classList.add('AddtoCartButton');
    AddtoCartButton.setAttribute('onclick', 'AddtoCart(this)');

    DeleteProduct.classList.add('DeleteProduct');
    DeleteProduct.setAttribute('onclick', 'deletethisProduct(this)');

    ImageGrid.src = product.image;
    ImageContainer.appendChild(ImageGrid);
    productID.innerHTML = `Product ID: ${product.id}`;
    title.innerHTML = `${product.title}`;
    price.innerHTML = `Price: $${product.price}`;
    description.innerHTML = `Description: ${product.description.slice(0, 100)}... click to see more`;
    category.innerHTML = `Category: ${product.category}`;
    rating.innerHTML = `Rating: ${product.rating.rate}/5`;
    count.innerHTML = `Stock Available: ${product.rating.count}`;
    AddtoCartButton.innerHTML = `Add to Cart`;
    DeleteProduct.innerHTML = `Delete this Product`;


    SingleProduct.appendChild(ImageContainer);
    SingleProduct.appendChild(title);
    SingleProduct.appendChild(productID);
    SingleProduct.appendChild(price);
    SingleProduct.appendChild(description);
    SingleProduct.appendChild(category);
    SingleProduct.appendChild(rating);
    SingleProduct.appendChild(count);
    SingleProduct.appendChild(AddtoCartButton);
    SingleProduct.appendChild(DeleteProduct);
    SingleProduct.setAttribute('id', `${product.id}`);

    DisplaySection.appendChild(SingleProduct);


}



function AddtoCart(element) {


}



function createProduct() {

}
function generateNewProduct() {
    creationofProduct();
    displayAllProducts();
    popupFunc();

}

function creationofProduct() {
    let ProductID = document.getElementById('ProductID').value;
    let ProductName = document.getElementById('ProductName').value;
    let ProductPrice = parseFloat(document.getElementById('ProductPrice').value);
    let ProductCategory = document.getElementById('ProductCategory').value;
    let ProductDesc = document.getElementById('ProductDesc').value;
    let ImageURL = document.getElementById('ImageURL').value;
    let ProductStock = document.getElementById('ProductStock').value;

    newObject = {
        "id": ProductID,
        "title": ProductName,
        "price": ProductPrice,
        "description": ProductDesc,
        "category": ProductCategory,
        "image": ImageURL,
        "rating": {
            "rate": 4.2,
            "count": ProductStock
        }
    }
    AllProducts.push(newObject);

}





function popupFunc() {
    let GenerateProduct = document.getElementById("GenerateProduct");
    if (GenerateProduct.style.display == "flex") {
        GenerateProduct.style.display = "none";
    }
    else {
        GenerateProduct.style.display = "flex";
    }
}


function deletethisProduct(butt) {
    let selectedObject = butt.parentElement;
    AllProducts = AllProducts.filter(product => product.id != selectedObject.id);
    DisplaySection.innerHTML = "";
    filteredDisplay(selectedCategory);
}



function filteredDisplay(category) {
    // AllProducts.forEach(product=>console.log(product.category));



    if (category == "all" || category == null) {
        DisplaySection.innerHTML = "";
        AllProducts.forEach(product => displaySingleProduct(product));
    }
    else {
        filteredProducts = AllProducts.filter(product => product.category == category);
        DisplaySection.innerHTML = "";
        filteredProducts.forEach(product => displaySingleProduct(product));
    }

}
let reqItem=null;
let ItemAddtoCartFormImage = document.getElementById("ItemAddtoCartForm-Image");
let titleofthereqProd = document.getElementById("titleoftheCartProduct");
let priceoftheAddedItem = document.getElementById('priceoftheAddedItem');
let formdata = document.getElementById('ItemAddtoCartForm');
let cancelX1=document.getElementById('cancelX1');
let OrderedNumber=document.getElementById('OrderedNumber');

function AddtoCart(btn) {
    reqItem = btn.parentElement;
    reqIDValue=parseInt(reqItem.id)-1;
    formdata.style.display = "flex";
    ItemAddtoCartFormImage.src = AllProducts[reqIDValue].image;
    titleofthereqProd.innerHTML = AllProducts[reqIDValue].title;
    priceoftheAddedItem.innerHTML = AllProducts[reqIDValue].price;
}

function CalculatePrice() {
    let reqItemsNos = parseFloat(document.getElementById("reqItemsNos").value);
    let estimatedPrice = document.getElementById('estimatedPrice');
    estimatedPrice.innerHTML = parseFloat(priceoftheAddedItem.innerHTML) * parseFloat(reqItemsNos);
}

function AddtoCartf(){
    if(reqItemsNos.value!=0){
        CartProducts.push(AllProducts[reqIDValue]);
        
        QtyPerProduct.push(reqItemsNos.value);
        console.log(QtyPerProduct);
        
        OverallPurchasingprice=OverallPurchasingprice+parseInt(estimatedPrice.innerHTML);
        
       
        formdata.style.display="none";
        OrderedNumber.innerHTML=CartProducts.length;
    }
    
}

function cancelXf(){
    formdata.style.display="none";
}


// let CartViewBoard=document.createElement('div');
// CartViewBoard.classList.add('CartViewBoard')
// CartViewBoard.setAttribute('id',"CartViewBoard");
// document.appendChild(CartViewBoard);


let CartItems=document.getElementById('CartItems');
CartItems.classList.add('CartItems');
let CartViewBoard=document.getElementById('CartViewBoard');







function viewCart(){
    CartViewBoard.style.display="block";
    CartItems.innerHTML="";
    CartProducts.forEach(product=>{
        let element=document.createElement('div');
        element.classList.add('element');
        let titleofpurchasedProd=document.createElement('h3');
        titleofpurchasedProd.innerHTML=`${CartProducts.indexOf(product)+1}. ${product.title}`;
        let X=parseInt(product.id)-1;
        console.log(product.id);
        
        let OrderedQty=document.createElement('p');
        OrderedQty.innerHTML=QtyPerProduct[X];
        element.appendChild(titleofpurchasedProd);
        
        CartItems.appendChild(element);
    });
    let overallPrice=document.createElement('p');
    overallPrice.innerHTML=`Overall Order Price is : ${OverallPurchasingprice}`;
    CartItems.appendChild(overallPrice);
}


function closeCart(){
    CartViewBoard.style.display="none";
}


