/* ============================================
   SKILLS CLOUD – auto-cycling category highlight
   Pauses while a tag is hovered.
   ============================================ */

(function () {
  var cloud = document.getElementById('skills-cloud');
  if (!cloud) return;

  var cats = ['mgmt', 'events', 'marketing', 'adobe', 'tools', 'arch', 'lang', 'soft'];
  var idx = 0, timer = null, hovered = false;

  function showCat(cat) {
    cloud.classList.add('cat-active');
    cloud.querySelectorAll('.skill-tag').forEach(function (x) { x.classList.remove('hl'); });
    cloud.querySelectorAll('[data-cat="' + cat + '"]').forEach(function (x) { x.classList.add('hl'); });
  }

  function step() {
    if (hovered) return;
    showCat(cats[idx]);
    idx = (idx + 1) % cats.length;
  }

  function startCycle() {
    clearInterval(timer);
    timer = setInterval(step, 2000);
    step();
  }

  startCycle();

  cloud.querySelectorAll('.skill-tag').forEach(function (tag) {
    tag.addEventListener('mouseenter', function () {
      hovered = true;
      clearInterval(timer);
      showCat(tag.dataset.cat);
    });
    tag.addEventListener('mouseleave', function () {
      hovered = false;
      startCycle();
    });
  });
})();
