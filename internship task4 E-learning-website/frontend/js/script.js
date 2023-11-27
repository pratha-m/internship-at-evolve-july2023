// Nav Links 
let homeLink=document.querySelector("#homeLink");
let loginLink=document.querySelector("#loginLink");
let signupLink=document.querySelector("#signupLink");
let uploadLink=document.querySelector("#uploadLink");
let profileLink=document.querySelector("#profileLink");
// Pages
let homePage=document.getElementById("homePage");
let loginPage=document.getElementById("loginPage");
let signUpPage=document.getElementById("signUpPage");
let uploadPage=document.getElementById("uploadPage");
let profilePage=document.getElementById("profilePage");
let section=document.querySelector("section");


function showHomePage(){
    homePage.style.display="flex";
    loginPage.style.display="none";
    signUpPage.style.display="none";
    uploadPage.style.display="none";
    profilePage.style.display="none";
    homeLink.firstChild.classList.add("active");
    loginLink.firstChild.classList.remove("active");
    signupLink.firstChild.classList.remove("active");
    uploadLink.firstChild.classList.remove("active");
    profileLink.firstChild.classList.remove("active");
}
function showLoginPage(){
    homePage.style.display="none";
    loginPage.style.display="flex";
    signUpPage.style.display="none";
    uploadPage.style.display="none";
    profilePage.style.display="none";
    homeLink.firstChild.classList.remove("active");
    loginLink.firstChild.classList.add("active");
    signupLink.firstChild.classList.remove("active");
    uploadLink.firstChild.classList.remove("active");
    profileLink.firstChild.classList.remove("active");
}
function showSignupPage(){
    homePage.style.display="none";
    loginPage.style.display="none";
    signUpPage.style.display="flex";
    uploadPage.style.display="none";
    profilePage.style.display="none";
    homeLink.firstChild.classList.remove("active");
    loginLink.firstChild.classList.remove("active");
    signupLink.firstChild.classList.add("active");
    uploadLink.firstChild.classList.remove("active");
    profileLink.firstChild.classList.remove("active");
}
function showUploadPage(){
    homePage.style.display="none";
    loginPage.style.display="none";
    signUpPage.style.display="none";
    uploadPage.style.display="flex";
    profilePage.style.display="none";
    homeLink.firstChild.classList.remove("active");
    loginLink.firstChild.classList.remove("active");
    signupLink.firstChild.classList.remove("active");
    uploadLink.firstChild.classList.add("active");
    profileLink.firstChild.classList.remove("active");
}
function showProfilePage(){
    homePage.style.display="none";
    loginPage.style.display="none";
    signUpPage.style.display="none";
    uploadPage.style.display="none";
    profilePage.style.display="flex";
    homeLink.firstChild.classList.remove("active");
    loginLink.firstChild.classList.remove("active");
    signupLink.firstChild.classList.remove("active");
    uploadLink.firstChild.classList.remove("active");
    profileLink.firstChild.classList.add("active");
}
