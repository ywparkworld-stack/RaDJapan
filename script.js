// ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ナビリンクをクリックで閉じる
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// スクロール時にヘッダーの影を調整
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(15,23,42,0.1)'
    : 'none';
});

// 数字カウントアップアニメーション
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// IntersectionObserver でビューポートに入ったときに発火
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(aboutSection);
}

// お問い合わせフォーム送信（デモ）
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  e.target.innerHTML = '<p class="form-success" style="display:block">お問い合わせありがとうございます。<br>内容を確認次第、担当者よりご連絡いたします。</p>';
});

// 応募フォーム送信 → Formspree 経由でメール転送
document.getElementById('applyForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const position = document.getElementById('apply-position').value;
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = '送信中...';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      form.innerHTML = `<p class="form-success" style="display:block">【${position}】へのご応募ありがとうございます。<br>内容を確認次第、担当者よりご連絡いたします。</p>`;
    } else {
      btn.disabled = false;
      btn.textContent = '応募する';
      alert('送信に失敗しました。しばらくしてから再度お試しください。');
    }
  } catch {
    btn.disabled = false;
    btn.textContent = '応募する';
    alert('通信エラーが発生しました。');
  }
});
