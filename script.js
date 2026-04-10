(function () {
  var navLinks = document.querySelectorAll(".nav__link");
  var sections = document.querySelectorAll("main section[id]");

  function setActive(sectionId) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute("data-section") === sectionId;
      link.classList.toggle("nav__link--active", match);
    });
  }

  function getCurrentSection() {
    var mid = window.scrollY + window.innerHeight * 0.25;
    var current = "home";
    sections.forEach(function (sec) {
      if (sec.offsetTop <= mid) {
        current = sec.id;
      }
    });
    return current;
  }

  var scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      window.requestAnimationFrame(function () {
        setActive(getCurrentSection());
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var id = link.getAttribute("data-section");
      if (id) setActive(id);
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", function () {
    setActive(getCurrentSection());
  });

  var contactForm = document.getElementById("contactForm");
  var contactStatus = document.getElementById("contactStatus");

  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      contactStatus.classList.remove("contact-form__status--error", "contact-form__status--success");

      var name = (contactForm.name.value || "").trim();
      var email = (contactForm.email.value || "").trim();
      var subject = (contactForm.subject.value || "").trim();
      var message = (contactForm.message.value || "").trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !email || !subject || !message) {
        contactStatus.textContent = "Please fill in all fields before submitting.";
        contactStatus.classList.add("contact-form__status--error");
        return;
      }

      if (!emailOk) {
        contactStatus.textContent = "Please enter a valid email address.";
        contactStatus.classList.add("contact-form__status--error");
        return;
      }

      contactStatus.textContent = "Message sent successfully. Thanks for reaching out.";
      contactStatus.classList.add("contact-form__status--success");
      contactForm.reset();
    });
  }
})();
