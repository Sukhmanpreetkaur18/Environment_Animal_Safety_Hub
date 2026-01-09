/**
 * Footer Loader
 * Loads the common footer component into all pages
 */

document.addEventListener("DOMContentLoaded", function () {
  loadFooter();
});

async function loadFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (!footerPlaceholder) return;

  // Ensure CSS is loaded
  injectFooterStyles();

  // Determine path to footer.html based on current location
  // This helps when the script is used in pages at different directory levels
  let footerPath = 'components/footer.html';
  
  // If we are in a subfolder (like src/pages/...), we need to go up
  const pathLevel = window.location.pathname.split('/').filter(p => p).length;
  // This is a bit tricky depending on the deployment. 
  // Let's use a simpler approach: check if we are in 'pages' folder
  if (window.location.pathname.includes('/pages/')) {
    // If we are in a sub-subfolder of pages
    const pathParts = window.location.pathname.split('/');
    const pagesIndex = pathParts.indexOf('pages');
    if (pagesIndex !== -1 && pagesIndex < pathParts.length - 2) {
        footerPath = '../../components/footer.html';
    } else {
        footerPath = '../components/footer.html';
    }
  }

  try {
    const response = await fetch(footerPath);
    if (!response.ok) throw new Error('Failed to load footer');
    const html = await response.text();
    footerPlaceholder.innerHTML = html;
    
    // Initialize newsletter handler if it exists in the footer
    initFooterNewsletter();
    
    // Update active links or paths if necessary
    updateFooterPaths();
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

function injectFooterStyles() {
  // Determine prefix based on path
  let prefix = '';
  if (window.location.pathname.includes('/pages/')) {
    const pathParts = window.location.pathname.split('/');
    const pagesIndex = pathParts.indexOf('pages');
    if (pagesIndex !== -1 && pagesIndex < pathParts.length - 2) {
      prefix = '../../';
    } else {
      prefix = '../';
    }
  }

  // Inject footer CSS if not already present
  if (!document.querySelector('link[href*="footer.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = prefix + 'css/components/footer.css';
    document.head.appendChild(link);
  }

  // Inject FontAwesome if not already present (required for icons)
  if (!document.querySelector('link[href*="font-awesome"]') && !document.querySelector('link[href*="all.min.css"]')) {
    const fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
    document.head.appendChild(fa);
  }
}

function initFooterNewsletter() {
  const newsletterSubmitBtn = document.getElementById('newsletterSubmitBtn');
  const newsletterEmailInput = document.getElementById('newsletterEmailInput');
  const newsletterMessage = document.getElementById('newsletterMessage');

  if (newsletterSubmitBtn && newsletterEmailInput) {
    newsletterSubmitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const email = newsletterEmailInput.value.trim();

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          newsletterMessage.textContent = '⚠ Please enter a valid email address.';
          newsletterMessage.className = 'newsletter-footer-message error';
          return;
        }

        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        if (!subscribers.includes(email)) {
          subscribers.push(email);
          localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
          newsletterMessage.textContent = 'Thank you for subscribing!';
          newsletterMessage.className = 'newsletter-footer-message success';
          newsletterEmailInput.value = '';
          setTimeout(() => {
            newsletterMessage.textContent = '';
            newsletterMessage.className = 'newsletter-footer-message';
          }, 5000);
        } else {
          newsletterMessage.textContent = '📧 This email is already subscribed.';
          newsletterMessage.className = 'newsletter-footer-message info';
        }
      }
    });
  }
}

function updateFooterPaths() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (!footerPlaceholder) return;

  const isSubPage = window.location.pathname.includes('/pages/');
  const isDeepSubPage = window.location.pathname.split('/').filter(p => p).includes('pages') && 
                       window.location.pathname.split('/').filter(p => p).length > (window.location.pathname.split('/').filter(p => p).indexOf('pages') + 1);

  if (!isSubPage) return;

  const links = footerPlaceholder.querySelectorAll('a');
  const images = footerPlaceholder.querySelectorAll('img');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      if (isDeepSubPage) {
        link.setAttribute('href', '../../' + href.replace('../../', ''));
      } else {
        // If we are in /pages/page.html, and link is 'pages/other.html'
        if (href.startsWith('pages/')) {
          link.setAttribute('href', href.replace('pages/', ''));
        } else if (href === 'index.html' || href.startsWith('index.html#')) {
          link.setAttribute('href', '../' + href);
        }
      }
    }
  });

  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('/')) {
        if (isDeepSubPage) {
            img.setAttribute('src', '../../' + src);
        } else {
            img.setAttribute('src', '../' + src);
        }
    }
  });
}
