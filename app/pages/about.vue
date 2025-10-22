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
                    <p>在設計與程式之間遊走，結合七年設計與兩年前網站發經驗，從品牌策略、UX/UI 到程式實作，將抽象需求化為能落地的數位體驗。</p>
                </div>
            </div>
            <div class="position-section">
                <div class="position">
                    <div class="title">專案經歷 | Experiences</div>
                    <div class="description">
                        <div class="section-07">
                            <span>2025</span>
                            <ul>
                                <li>財團法人農業信用保證基金 企業內訓｜生成式 AI 應用專題演講</li>
                                <li>
                                    <div>第32屆台灣人因工程年會暨國際研討會發表</div>
                                    <div>整合生成式人工智慧與地端大型語言模型於未來教育的推測設計 最佳口頭發表論文獎</div>
                                    <div>Speculative Design on Integrating AIGC and the Local Large Language Model for Future Education</div>
                                    <div>導入對話機器人於數位文化探針之設計與評估 最佳口頭發表論文獎</div>
                                    <div>Applying ChatBot in the Design and Evaluation of Digital Cultural Probes</div>
                                </li>
                                <li>
                                    <div>十八界崇越論文大賞 決賽入選</div>
                                    <div>整合文化探針與人工智慧語境分析於可適化年長者照護策略設計</div>
                                    <div>The Integration of Cultural Probes and Artificial Intelli-gence Contextual Analysis in the Design of Adaptive Elderly Care Strategies</div>
                                </li>
                            </ul>
                        </div>

                        <div class="section-06">
                            <span>2023</span>
                            <ul>
                                <li>觀光局旅遊服務中心 線上文字客服系統介面規劃</li>
                                <li>南投縣政府 南投育兒資源網 前端開發</li>
                            </ul>
                        </div>

                        <div class="section-05">
                            <span>2022</span>
                            <ul>
                                <li>星舟快充股份有限公司 APP 與後台管理系統開發規劃</li>
                                <li>教育部青年署 × 北科大：青年發展整合型資訊平臺建置與維護</li>
                            </ul>
                        </div>

                        <div class="section-04">
                            <span>2021</span>
                            <ul>
                                <li>桃園市即時交通資訊系統維運與擴充服務（桃園輕鬆Go APP 功能維護）</li>
                                <li>桃園國際機場 A-CDM 協調整合系統介面規劃與設計</li>
                                <li>基隆交通號誌控制系統 介面規劃與設計</li>
                                <li>八二八數位智能 品牌宣傳片-「愛是傳遞幸福」插畫設計</li>
                            </ul>
                        </div>

                        <div class="section-04">
                            <span>2020</span>
                            <ul>
                                <li>「翻轉・臺北城」臺北老城區品牌共創行動計畫 專案統籌</li>
                            </ul>
                        </div>

                        <div class="section-03">
                            <span>2018</span>
                            <ul>
                                <li>魏嘉瑩 Legacy「不完美不後悔」演唱會舞台插畫設計</li>
                            </ul>
                        </div>

                        <div class="section-02">
                            <span>2017</span>
                            <ul>
                                <li>「曼谷國際禮品家飾展-臺東館」視覺設計</li>
                            </ul>
                        </div>

                        <div class="section-01">
                            <span>2013</span>
                            <ul>
                                <li>「大安·漫·森活 捷運信義線」視覺設計</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="reward">
                    <div class="title">獲獎經歷 | Awards</div>
                    <div class="description">
                        <div class="section-01">
                            <ul>
                                <li></li>
                                <li>2025 十八界崇越論文大賞 入選</li>
                                <li>2019 桃園插畫大展 佳作</li>
                                <li>2015 放視大賞 行動應用類 金獎</li>
                                <li>2015 第34屆新一代設計展 入圍（金典新秀贊助特別獎）</li>
                            </ul>
                        </div>
                    </div>
                    <div class="title">學歷 | Education</div>
                    <div class="description">
                        <div class="section-01">
                            <ul>
                                <li>國立臺北科技大學 互動設計研究所 碩士 | 2023-2025</li>
                                <li>國立臺灣藝術大學 視覺傳達設計系 學士 | 2012-2015</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="img-wrap">
            <div class="img"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding: 10rem 14rem;
    background-color: $color-bg;
    position: relative;
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
        margin: 8rem 0; 
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
                    background-image: url('/avatar.png'); // 👈 用同一張圖
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center; // 預設
                    background-blend-mode: multiply; 
                    &:nth-child(1) { 
                        background-position: 0% 20%; 
                        filter: brightness(1.2);
                    }
                    &:nth-child(2) { 
                        background-position: 20% 40%; 
                        filter: brightness(1);
                    }
                    &:nth-child(3) { 
                        background-position: 40% 60%; 
                        filter: brightness(.9);
                    }
                    &:nth-child(4) { 
                        background-position: 60% 80%; 
                        filter: brightness(.8);
                    }
                    &:nth-child(5) { 
                        background-position: 80% 100%; 
                        filter: brightness(.7);
                    }
                    &:nth-child(6) { 
                        background-position: 100% 50%; 
                        filter: brightness(.6);
                    }
                }
                .pill + .pill {
                    margin-left: calc(-1 * var(--overlap));
                }
            }
            p {
                max-width: 27rem;
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
                flex: 6;
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
            .reward {
                flex: 3;
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
        }
    }
    .img-wrap {
        position: absolute;
        right: 14rem;
        bottom: 0rem;
        width: 420px;
        height: 420px;
        background-image: url('/desk.png');
        background-size: cover;
        background-repeat: no-repeat;
        .img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>