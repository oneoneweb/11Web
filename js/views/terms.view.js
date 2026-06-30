/* =====================================================
   📜 TERMS & CONDITIONS VIEW (11WEB - PRODUCTION GRADE)
   ENTERPRISE LEGAL STYLE • GOOGLE-LIKE STRUCTURE
   SPA SAFE • ROUTER READY • NO DEPENDENCY
===================================================== */

const TermsView = (() => {

  function render(container) {

    if (!container) {
      console.error("TermsView: container missing");
      return;
    }

    container.innerHTML = `
      <section class="legal-page">

        <!-- ================= HEADER ================= -->
        <div class="legal-header">
          <h1>11WEB Terms & Conditions</h1>
          <p>Last Updated: January 2026</p>
          <p class="legal-sub">
            Please read these Terms carefully before using 11WEB.
            By accessing or using the application, you agree to be bound by these Terms.
          </p>
        </div>

        <!-- ================= CONTENT ================= -->
        <div class="legal-content">

          <h2>1. Introduction</h2>
          <p>
            These Terms & Conditions (“Terms”) govern your access to and use of the 11WEB platform,
            a browser-based navigation system designed to provide access to third-party websites
            and digital services through a unified interface.
          </p>

          <p>
            By using this application, you confirm that you understand and agree to these Terms.
            If you do not agree, you must immediately discontinue use of the service.
          </p>

          <h2>2. Nature of Service</h2>
          <p>
            11WEB does not operate, host, manage, or control any third-party websites or services
            accessible through the platform.
          </p>

          <p>
            The platform acts strictly as an intermediary navigation layer and does not modify,
            endorse, or guarantee any external content.
          </p>

          <h2>3. User Eligibility</h2>
          <p>
            You must be at least 18 years of age or meet the legal age requirement in your jurisdiction
            to use this application.
          </p>

          <p>
            By using the service, you confirm that your use complies with all applicable local laws.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>
            External websites accessed through 11WEB are governed by their own terms and policies.
            We are not responsible for their content, services, or actions.
          </p>

          <p>
            Any interaction with third-party platforms is solely between you and the respective provider.
          </p>

          <h2>5. Risk Acknowledgment</h2>
          <p>
            You acknowledge that accessing third-party services may involve risks including but not limited to:
          </p>

          <p>
            - Financial loss<br/>
            - Data exposure on external platforms<br/>
            - Service unavailability<br/>
            - Regional legal restrictions
          </p>

          <p>
            11WEB assumes no responsibility for any such risks.
          </p>

          <h2>6. Gambling & Restricted Content Disclaimer</h2>
          <p>
            Some third-party services may include gambling, betting, or restricted content.
          </p>

          <p>
            11WEB does not promote, operate, or control such services and holds no responsibility
            for user participation or outcomes.
          </p>

          <h2>7. Financial Disclaimer</h2>
          <p>
            11WEB does not process payments, deposits, withdrawals, or financial transactions.
          </p>

          <p>
            Any financial activity is handled exclusively by external platforms.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, 11WEB shall not be liable for any direct, indirect,
            incidental, consequential, or punitive damages arising from your use of the service.
          </p>

          <h2>9. Service Availability</h2>
          <p>
            We do not guarantee uninterrupted or error-free operation of the platform.
            Features may be modified, suspended, or discontinued without prior notice.
          </p>

          <h2>10. Intellectual Property</h2>
          <p>
            All branding, interface structure, and system design of 11WEB are protected under applicable
            intellectual property laws.
          </p>

          <p>
            Third-party trademarks, logos, and content belong to their respective owners.
          </p>

          <h2>11. Termination</h2>
          <p>
            We reserve the right to restrict or terminate access to the platform at any time,
            with or without notice, for any reason including violation of these Terms.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We may update or modify these Terms at any time.
            Continued use of the application constitutes acceptance of the updated Terms.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed by applicable laws of your jurisdiction unless otherwise required.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            For any questions regarding these Terms, contact:
          </p>

          <p>
            📧 OneOneWeb11@gmail.com
          </p>

        </div>

      </section>
    `;
  }

  return { render };

})();

window.TermsView = TermsView;