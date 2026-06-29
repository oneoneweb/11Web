/* =====================================================
   📞 CONTACT VIEW (11WEB SPA - PRODUCTION UPGRADED)
   FULL UI • VALIDATION • FAQ EXPANDED • CLEAN STRUCTURE
===================================================== */

const ContactView = (() => {

  let root = null;

  function render(container) {

    root = container;

    if (!root) {
      console.error("ContactView: container missing");
      return;
    }

    draw();
  }

  function draw() {

    root.innerHTML = `
      <section class="contact-page">

        <!-- ================= HEADER ================= -->
        <div class="contact-header">
          <h1>Contact Support</h1>
          <p>We usually respond within 24–48 hours</p>
          <span class="contact-sub">
            Please include device/browser details for faster support.
          </span>
        </div>

        <!-- ================= INFO CARDS ================= -->
        <div class="contact-info-grid">

          <div class="info-card">
            <h3>📧 Email</h3>
            <p>OneOneWeb11@gmail.com</p>
          </div>

          <div class="info-card">
            <h3>⚡ Response Time</h3>
            <p>24 – 48 Hours</p>
          </div>

          <div class="info-card">
            <h3>🌐 Service Type</h3>
            <p>Browser Navigation Platform</p>
          </div>

          <div class="info-card">
            <h3>🔒 Data Policy</h3>
            <p>No personal data stored</p>
          </div>

        </div>

        <!-- ================= CONTACT FORM ================= -->
        <div class="contact-form-box">

          <form id="contactForm">

            <div class="form-group">
              <label>Name (Optional)</label>
              <input type="text" id="name" placeholder="Your name">
            </div>

            <div class="form-group">
              <label>Email (Optional)</label>
              <input type="email" id="email" placeholder="you@email.com">
            </div>

            <div class="form-group">
              <label>Subject *</label>
              <select id="subject">
                <option value="">Select Subject</option>
                <option value="technical">Technical Issue</option>
                <option value="bug">Bug Report</option>
                <option value="suggestion">Suggestion</option>
                <option value="legal">Legal Inquiry</option>
                <option value="account">Account Issue</option>
              </select>
            </div>

            <div class="form-group">
              <label>Message *</label>
              <textarea id="message" rows="6" placeholder="Describe your issue in detail..."></textarea>
            </div>

            <button type="submit" class="contact-btn">
              Send Message
            </button>

          </form>

        </div>

        <!-- ================= IMPORTANT NOTICE ================= -->
        <div class="contact-legal">
          <h3>Important Notice</h3>
          <p>
            11WEB is a browser-based navigation platform.
            We do not operate, control, or manage any third-party websites.
            We do not process payments, deposits, or financial transactions.
            External services are fully independent and user responsibility applies.
          </p>
        </div>

        <!-- ================= FAQ ================= -->
        <div class="contact-faq">

          <h3>Frequently Asked Questions</h3>

          <details>
            <summary>Why is the app not loading properly?</summary>
            <p>
              This usually happens due to slow internet, cache issues, or temporary server load.
              Try refreshing the page or switching networks.
            </p>
          </details>

          <details>
            <summary>Do you store any personal data?</summary>
            <p>
              No. We do not store personal data such as name, email, phone number, or payment information.
            </p>
          </details>

          <details>
            <summary>Is 11WEB responsible for external websites?</summary>
            <p>
              No. All external websites are independently managed by their respective providers.
              11WEB only provides navigation access.
            </p>
          </details>

          <details>
            <summary>How long does support take?</summary>
            <p>
              Support responses are typically handled within 24–48 hours depending on request volume.
            </p>
          </details>

          <details>
            <summary>Can I request feature updates?</summary>
            <p>
              Yes. Feature suggestions are welcome and may be included in future updates.
            </p>
          </details>

        </div>

      </section>
    `;

    bindEvents();
  }

  function bindEvents() {

    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value.trim(),
        time: new Date().toISOString()
      };

      // ================= VALIDATION =================
      if (!data.subject) {
        alert("Please select a subject");
        return;
      }

      if (!data.message || data.message.length < 5) {
        alert("Message is too short");
        return;
      }

      // ================= STORE =================
      const old = JSON.parse(localStorage.getItem("contact_messages") || "[]");
      old.push(data);
      localStorage.setItem("contact_messages", JSON.stringify(old));

      form.reset();

      alert("Message sent successfully!");
    });
  }

  return { render };

})();

window.ContactView = ContactView;