(function () {
  var KEY = 'sj_pw_ok';
  var PW  = '54321';

  if (sessionStorage.getItem(KEY) === '1') return;

  var overlay = document.createElement('div');
  overlay.id = 'pw-overlay';
  overlay.innerHTML = [
    '<div id="pw-box">',
    '  <p id="pw-label">Passwort</p>',
    '  <input id="pw-input" type="password" autocomplete="current-password" placeholder="••••••" />',
    '  <button id="pw-btn">Weiter</button>',
    '  <p id="pw-error"></p>',
    '</div>'
  ].join('');

  var style = document.createElement('style');
  style.textContent = [
    '#pw-overlay{position:fixed;inset:0;background:#1e1e1e;display:flex;align-items:center;justify-content:center;z-index:99999;}',
    '#pw-box{display:flex;flex-direction:column;align-items:center;gap:16px;width:280px;}',
    '#pw-label{font-family:"Open Sans",Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#888;}',
    '#pw-input{width:100%;padding:12px 16px;background:#2b2b2b;border:1px solid #3a3a3a;color:#f1f1f1;font-family:"Open Sans",Arial,sans-serif;font-size:16px;text-align:center;outline:none;letter-spacing:4px;}',
    '#pw-input:focus{border-color:#957b5f;}',
    '#pw-btn{width:100%;padding:12px;background:#957b5f;border:none;color:#f1f1f1;font-family:"Open Sans",Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:background 300ms;}',
    '#pw-btn:hover{background:#c6a47e;}',
    '#pw-error{font-family:"Open Sans",Arial,sans-serif;font-size:12px;color:#c0392b;letter-spacing:1px;min-height:16px;}'
  ].join('');

  document.head.appendChild(style);
  document.body.appendChild(overlay);

  function check() {
    var val = document.getElementById('pw-input').value;
    if (val === PW) {
      sessionStorage.setItem(KEY, '1');
      overlay.remove();
      style.remove();
    } else {
      document.getElementById('pw-error').textContent = 'Falsches Passwort';
      document.getElementById('pw-input').value = '';
    }
  }

  document.getElementById('pw-btn').addEventListener('click', check);
  document.getElementById('pw-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') check();
  });
})();
