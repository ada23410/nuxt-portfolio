<template>
    <footer class="site-footer">
        <div class="contact">
            <div class="call-to-action">Let’s talk about your needs and vision.</div>
                <NuxtLink to="/contact" class="contact-btn">Contact</NuxtLink>
            </div>
        <nav class="menu" aria-label="Footer navigation">
                <ul>
                    <li><NuxtLink to="/projects">PROJECT</NuxtLink></li>
                    <li><NuxtLink to="/resources">RESOURCES</NuxtLink></li>
                    <li><NuxtLink to="/about">ABOUT</NuxtLink></li>
                    <li><NuxtLink to="/contact">CONTACT</NuxtLink></li>
                </ul>
        </nav>
    </footer>
</template>

<style lang="scss" scoped>

.site-footer {
  padding: 6rem 14rem;
  min-height: 30vh;
  background-color: $color-bg-dark;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.contact {
  .call-to-action {
    font-size: $font-size-xxl;
    color: $color-text-white;
  }
}

.contact-btn {
  display: inline-block;
  margin-top: 2rem;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  font-size: $font-size-lg;
  background-color: $color-bg;
  color: $color-text;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform .15s ease, box-shadow .15s ease;
  cursor: pointer;
}
.contact-btn:hover,
.contact-btn:focus-visible {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0,0,0,.12);
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu li { margin-bottom: 1.5rem; }
.menu a {
  text-decoration: none;
  font-size: $font-size-xl;
  font-weight: 400;
  color: $color-text-white;
}
.menu a:hover,
.menu a:focus-visible { text-decoration: underline; }

/* RWD */
@media (max-width: 1024px) {
  .site-footer { padding: 4rem 2rem; flex-direction: column; gap: 2rem; }
}
</style>