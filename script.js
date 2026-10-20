// ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// スクロール時にヘッダーの影
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(15,23,42,0.1)'
    : 'none';
});

// 法人お問い合わせフォーム送信
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  e.target.innerHTML = '<p class="form-success">お問い合わせありがとうございます。<br>内容を確認次第、担当者よりご連絡いたします。</p>';
});
