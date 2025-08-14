// Ensure DOM is ready before running any JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // GSAP Initialization
  gsap.registerPlugin(ScrollTrigger);

  // Cart functionality
  let cart = [];
  let cartTotalAmount = 0;

  // Dark mode detection
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.classList.add("dark");
  }
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (event.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });

  // Navigation animations
  gsap.timeline().to(".nav-item", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  });

  // Letter animation for JOJOS title
  gsap
    .timeline({ delay: 0.5 })
    .to(".letter", {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)",
    })
    .to(
      ".hero-text",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.3"
    );

  // Scroll-triggered animations
  gsap.utils.toArray(".menu-item").forEach((item) => {
    gsap.fromTo(
      item,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Cart functionality
  const cartToggle = document.getElementById("cart-toggle");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartClose = document.getElementById("cart-close");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  function openCart() {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function updateCart() {
    cartCount.textContent = cart.length;
    cartTotal.textContent = `$${cart
      .reduce((sum, item) => sum + parseFloat(item.price), 0)
      .toFixed(2)} USD`;

    if (cart.length === 0) {
      cartItems.innerHTML =
        '<p class="text-gray-500 text-center py-8">No items found.</p>';
    } else {
      cartItems.innerHTML = cart
        .map(
          (item, index) => `
            <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${item.type}</p>
                </div>
                <div class="text-right">
                    <p class="font-semibold">$${item.price}</p>
                    <button onclick="removeFromCart(${index})" class="text-red-500 text-sm hover:text-red-700">Remove</button>
                </div>
            </div>
        `
        )
        .join("");
    }
  }

  // The removeFromCart function must be a global function to be called from the `onclick` attribute.
  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  // Event listeners
  cartToggle.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Parallax effect for hero section
  gsap.to(".hero-bg", {
    backgroundPosition: "50% 100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-bg",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // Opening hours animations
  function initOpeningHoursAnimations() {
    const tags = [
      ".tag-hour-1",
      ".tag-hour-2",
      ".tag-hour-3",
      ".tag-hour-4",
      ".tag-hour-5",
      ".tag-hour-6",
      ".tag-hour-7",
    ];

    tags.forEach((tag, index) => {
      gsap.fromTo(
        tag,
        { y: 100, opacity: 0, rotation: 0 },
        {
          y: 0,
          opacity: 1,
          rotation: Math.random() * 10 - 5,
          duration: 1,
          delay: index * 0.1,
          ease: "power2.out",
          // Temporarily comment out the scrollTrigger to test
          // scrollTrigger: {
          //   trigger: ".about-home",
          //   start: "top 80%",
          //   end: "bottom 20%",
          //   toggleActions: "play none none reverse",
          // },
        }
      );
    });

    // Image scale animation
    gsap.to(".image", {
      scale: 1.1,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }

  // Call the functions to initialize animations and cart
  initOpeningHoursAnimations();
  updateCart();
});
