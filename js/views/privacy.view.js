/* =====================================================
   🔐 11WEB PRIVACY POLICY VIEW (PRODUCTION IMPROVED v2)
   CLEAN LEGAL • EXTENDED • SPA SAFE • NO WRAPPER ISSUE
===================================================== */

const PrivacyView = (() => {

  function render(container) {

    if (!container) {
      console.error("PrivacyView: container missing");
      return;
    }

    container.innerHTML = `
      <section class="legal-page">

        <!-- HEADER -->
        <div class="legal-header">
          <h1>11WEB Privacy Policy</h1>
          <p>Last Updated: 2026</p>
        </div>

        <!-- CONTENT -->
        <div class="legal-content">

          <h2>Application Overview</h2>
          <p>
            This application, 11WEB, is a browser-based navigation platform that allows users to access
            third-party websites and online services from a unified interface. We do not operate, host,
            or control any external platforms linked within the application.
          </p>

          <h2>Data Collection Policy</h2>
          <p>
            - We do not collect personal information such as name, email, phone number, or payment details.<br>
            - We do not require user registration or account creation.<br>
            - No sensitive personal data is stored on our servers.
          </p>

          <h2>Technical Information</h2>
          <p>
            - We may collect limited technical data such as device type, browser type, and usage behavior.<br>
            - This information is used only to improve performance and user experience.<br>
            - All collected data is anonymous and not linked to personal identity.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            - 11WEB may redirect users to external websites.<br>
            - We are not responsible for content, policies, or operations of third-party platforms.<br>
            - Users must review external site policies before interaction.
          </p>

          <h2>Gambling & Risk Disclaimer</h2>
          <p>
            - Some external websites may include gambling or betting services.<br>
            - 11WEB does not operate, control, or guarantee any such services.<br>
            - We are not responsible for financial outcomes, winnings, or losses.<br>
            - Users access all external services at their own risk.
          </p>

          <h2>Age Restriction</h2>
          <p>
            - 11WEB is intended for users aged 18 years or older.<br>
            - Users must comply with local laws regarding online content and gambling services.<br>
            - We do not knowingly provide services to minors.
          </p>

          <h2>Financial Responsibility</h2>
          <p>
            - 11WEB does not process any financial transactions.<br>
            - We are not responsible for deposits, withdrawals, or payments on third-party platforms.<br>
            - All financial activity is strictly between the user and external service providers.
          </p>

          <h2>Security Disclaimer</h2>
          <p>
            - We do not guarantee the security or safety of external websites.<br>
            - Users may be exposed to risks beyond our control.<br>
            - Users are advised to verify external platform security independently.
          </p>

          <h2>External Links</h2>
          <p>
            - External links may change or become unavailable without notice.<br>
            - We do not guarantee accuracy, availability, or reliability of external content.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            - 11WEB is not liable for any direct, indirect, or incidental damages.<br>
            - We are not responsible for financial loss, data loss, or service disruption.<br>
            - Use of external services is entirely at user risk.
          </p>

          <h2>Policy Updates</h2>
          <p>
            - This Privacy Policy may be updated at any time without prior notice.<br>
            - Continued use of 11WEB indicates acceptance of any changes.
          </p>

          <h2>Contact Information</h2>
          <p>
            - Support: OneOneWeb11@gmail.com <br>
            - Response Time: Within reasonable business timeframe
          </p>

        </div>

      </section>
    `;
  }

  return { render };

})();

/* GLOBAL EXPORT */
window.PrivacyView = PrivacyView;