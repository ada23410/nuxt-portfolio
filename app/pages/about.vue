<template>
    <div class="container">
        <div class="about-head">
            <div class="title">
                <h1>ɐida</h1>
                <h2>Designing with Empathy,Developing with Precision.</h2>
            </div>
            <div>
                <p>專注於體驗細節與效能品質，將設計與開發融入可靠的數位服務，讓每一次互動都兼具人性的溫度與科技的精準。</p>
            </div>
        </div>
        <div class="about-body">
            <div class="warp-box">
                <div class="inorganic">
                    <span class="pill"></span>
                    <span class="pill"></span>
                    <span class="pill"></span>
                    <span class="pill"></span>
                    <span class="pill"></span>
                    <span class="pill"></span>    
                </div>
                <div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt nulla doloremque earum laboriosam, non odit architecto dolorum, est ipsam dicta explicabo commodi quos, culpa vero numquam sunt sed consequatur. Molestiae?</p>
                </div>
            </div>
            <div class="position-section">
                <div class="position">
                    <div class="title">Title | Position</div>
                    <div class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore qui nostrum fugit non atque officiis repellendus voluptate ad magnam. Maxime animi ipsum ipsa commodi unde deserunt blanditiis vero necessitatibus.</div>
                    <div class="title">Title | Position</div>
                    <div class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore qui nostrum fugit non atque officiis repellendus voluptate ad magnam. Maxime animi ipsum ipsa commodi unde deserunt blanditiis vero necessitatibus.</div>
                    <div class="title">Title | Position</div>
                    <div class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam labore qui nostrum fugit non atque officiis repellendus voluptate ad magnam. Maxime animi ipsum ipsa commodi unde deserunt blanditiis vero necessitatibus.</div>
                </div>
                <div class="img"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding: 10rem 14rem;
    background-color: $color-bg;
    .about-head {
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
    .about-body {
        .warp-box{ 
            margin-bottom: 8rem;
            .inorganic {
                --h: clamp(540px, 30vw, 630px);   // 高度（響應式）
                --w: clamp(260px, 20vw, 260px);   // 寬度
                --r: 90px;                        // 圓角
                --overlap: 10px;                  // 重疊量（越大縫隙越小）
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
        }
        .position-section {
            display: flex;
            justify-content: space-between;
            align-content: center;
            gap: 10rem;  
            margin-bottom: 8rem;
            .position {
                .title {
                    font-size: $font-size-xxl;
                    font-weight: 500;
                    margin-bottom: 1rem;
                }
                .description {
                    font-size: $font-size-base;
                    line-height: 2rem;
                    font-weight: 400;
                    color: $color-text;
                    margin-bottom: 2rem;
                }
            }
            .img {
                width: 100%;
                max-width: 495px;                
                aspect-ratio: 1 / 1;      
                background-color: $color-text-light;
                border-radius: 60px;
                align-self: center;
            }
        }
    }
}
</style>