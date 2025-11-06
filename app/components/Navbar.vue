<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="logo">
      <div class="aida">
        <NuxtLink to="/">ɐida</NuxtLink>
      </div>
    </div>

    <div class="menu">
      <ul>
        <li>
          <NuxtLink to="/projects">
            <span class="flip">
              <span class="reel">
                <span class="item">PROJECT</span>
                <span class="item">PROJECT</span>
                <span class="item">PROJECT</span>
              </span>
            </span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/resources">
            <span class="flip">
              <span class="reel">
                <span class="item">RESOURCES</span>
                <span class="item">RESOURCES</span>
                <span class="item">RESOURCES</span>
              </span>
            </span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/about">
            <span class="flip">
              <span class="reel">
                <span class="item">ABOUT</span>
                <span class="item">ABOUT</span>
                <span class="item">ABOUT</span>
              </span>
            </span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/contact">
            <span class="flip">
              <span class="reel">
                <span class="item">CONTACT</span>
                <span class="item">CONTACT</span>
                <span class="item">CONTACT</span>
              </span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 18rem;
  background-color: $color-bg;
  @media (max-width: $breakpoint-xl) {
    padding: 1rem 12rem;
  }
  @media (max-width: $breakpoint-lg) {
    padding: 1rem 6rem;
  }
  .logo {
    a {
      text-decoration: none;
      font-size: $font-size-xl;
      color: $color-text;
    }
  }
  .menu {
    perspective: 800px;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        padding: 0 1rem;
        a {
          text-decoration: none;
          font-size: $font-size-base;
          color: $color-text;
          display: inline-block;
          .flip {
            --dur: 0.55s;
            --h: 1.5em;
            position: relative;
            display: inline-block;
            height: var(--h);
            line-height: var(--h);
            overflow: hidden;
            &::before,
            &::after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              height: 30%;
              pointer-events: none;
              z-index: 1;
              transition: opacity var(--dur) ease;
            }
            &::before {
              top: 0;
              background: linear-gradient(to bottom, var(--shade), transparent);
              opacity: 0.2;
            }
            &::after {
              bottom: 0;
              background: linear-gradient(to top, var(--shade), transparent);
              opacity: 0.2;
            }
            .reel {
              display: grid;
              grid-auto-rows: var(--h); /* 每格剛好一行高 */
              transform: translateY(0); /* 初始顯示第一行 */
              transition: transform var(--dur) cubic-bezier(0.2, 0.7, 0.15, 1);
              will-change: transform;
            }
            .item {
              height: var(--h);
              line-height: var(--h);
            }
          }
        }
        &:hover a .flip .reel,
        &:focus-within a .flip .reel {
          transform: translateY(-33%);
        }
        &:hover a .flip::before,
        &:hover a .flip::after,
        &:focus-within a .flip::before,
        &:focus-within a .flip::after {
          opacity: 0.35;
        }
      }
    }
  }
}

a.router-link-active .flip .reel {
  transform: translateY(-33%);
}
</style>
