<template>
  <div class="container">
    <div class="contact-head">
      <div class="title">
        <h1>Contact</h1>
        <h2>Designing with Empathy,Developing with Precision.</h2>
      </div>
      <div>
        <p>
          專注於體驗細節與效能品質，將設計與開發融入可靠的數位服務，讓每一次互動都兼具人性的溫度與科技的精準。
        </p>
      </div>
    </div>
    <div class="contact-body">
      <div class="warp-box">
        <div class="inorganic">
          <span class="pill"></span>
          <span class="pill"></span>
          <span class="pill"></span>
          <span class="pill"></span>
          <span class="pill"></span>
          <span class="pill"></span>
        </div>
        <div class="info">
          <div class="contact-content">
            <div class="title">CONTACT</div>
            <div class="list">ada10050616@gmail.com</div>
          </div>
          <div class="social-content">
            <div class="title">FOLLOW ME</div>
            <div class="list">
              <ul>
                <li><a href="">GitHub</a></li>
                <li><a href="">Instagram</a></li>
                <li><a href="">Behance</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 10rem 18rem;
  background-color: $color-bg;
  @media (max-width: $breakpoint-xl) {
    padding: 10rem 12rem;
  }
  .contact-head {
    display: flex;
    justify-content: space-between;
    align-items: end;
    .title {
      h1 {
        font-size: $font-size-giant;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      h2 {
        font-size: $font-size-xl;
        line-height: 2rem;
        font-weight: 400;
        color: $color-text;
      }
    }
    p {
      max-width: 26rem;
      font-size: $font-size-base;
      line-height: 2rem;
      font-weight: 400;
      color: $color-text;
    }
  }
  .contact-body {
    margin: 8rem 0;
    .warp-box {
      margin-bottom: 8rem;
      .inorganic {
        --h: clamp(540px, 30vw, 630px); // 高度（響應式）
        --w: clamp(260px, 20vw, 260px); // 寬度
        --r: 90px; // 圓角
        --overlap: 10px; // 重疊量（越大縫隙越小）
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5rem 0;
        .pill {
          width: var(--w);
          height: var(--h);
          border-radius: calc(var(--r) * 1.5);
          background: $color-text-light;
          position: relative;
        }
        .pill + .pill {
          margin-left: calc(-1 * var(--overlap));
        }
      }
      p {
        max-width: 26rem;
        margin-left: auto;
        font-size: $font-size-base;
        line-height: 2rem;
        font-weight: 400;
        color: $color-text;
      }
      .info {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .contact-content {
          flex: 1;
          .title {
            font-size: $font-size-xxl;
            font-weight: 500;
            margin-bottom: 1rem;
          }
          .list {
            font-size: $font-size-base;
            line-height: 2rem;
            font-weight: 400;
            color: $color-text;
            margin-bottom: 2rem;
          }
        }
        .social-content {
          flex: 1;
          .title {
            font-size: $font-size-xxl;
            font-weight: 500;
            margin-bottom: 1rem;
          }
          .list {
            font-size: $font-size-base;
            line-height: 2rem;
            font-weight: 400;
            color: $color-text;
            margin-bottom: 2rem;
            ul > li > a {
              text-decoration: none;
            }
          }
        }
      }
    }
  }
}
</style>
