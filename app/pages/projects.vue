<template>
    <div class="container">
        <div  class="project-head">
            <div class="title">
                <h1>Recent Project</h1>
                <div class="category">
                    <span>All</span>
                    <span>Branding</span>
                    <span>Graphic</span>
                    <span>Website</span>
                    <span>Illustration</span>
                </div>
            </div>
            <div>
                <p>專注於體驗細節與效能品質，將設計與開發融入可靠的數位服務，讓每一次互動都兼具人性的溫度與科技的精準。</p>
            </div>
        </div>
        <div class="project-body">
            <!-- first -->
            <div   class="wrap-box">
                <div class="card-left-01">
                    <div class="card-head">
                        <div class="img"></div>
                    </div>
                    <div class="card-body">
                        <div class="title">
                            <div class="text">Title</div>
                            <div class="time">2025.06.01_______</div>
                        </div>
                        <div class="description">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure error assumenda non consequuntur natus! Expedita accusamus unde sit explicabo neque qui? Distinctio quos consectetur libero, reprehenderit at id aliquam possimus!</p>
                            <div class="tag">
                                <span class="text">tag</span>
                                <span class="text">tag</span>
                                <span class="look-more">
                                    <a href="">
                                        <div class="look-more-text">MORE</div>
                                        <div   class="arrow" aria-hidden="true">
                                            <i>→</i><i>→</i><i>→</i>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-right-01">
                    <div class="card-head">
                        <div class="circle-img"></div>
                    </div>
                    <div class="card-body">
                        <div class="title">
                            <div class="text">Title</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- second -->
            <div class="wrap-box">
                <div class="card-right-02">
                    <div class="card-head">
                        <div class="inorganic">
                            <span class="pill"></span>
                            <span class="pill"></span>
                            <span class="pill"></span>
                            <span class="pill"></span>  
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="title">
                            <div class="text">Title</div>
                        </div>
                    </div>
                </div>
                <div class="card-left-02">
                    <div class="card-head">
                        <div class="img"></div>
                    </div>
                    <div class="card-body">
                        <div class="title">
                            <div class="text">Title</div>
                            <div class="time">2025.06.01_______</div>
                        </div>
                        <div class="description">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure error assumenda non consequuntur natus! Expedita accusamus unde sit explicabo neque qui? Distinctio quos consectetur libero, reprehenderit at id aliquam possimus!</p>
                            <div class="tag">
                                <span class="text">tag</span>
                                <span class="text">tag</span>
                                <span class="look-more">
                                    <a href="">
                                        <div class="look-more-text">MORE</div>
                                        <div class="arrow" aria-hidden="true">
                                            <i>→</i><i>→</i><i>→</i>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- third -->
            <div class="wrap-box">
                <div class="card-left-03">
                    <div class="card-head">
                        <div class="img"></div>
                    </div>
                    <div class="card-body">
                        <div class="title">
                            <div class="text">Title</div>
                            <div class="time">2025.06.01_______</div>
                        </div>
                        <div class="description">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure error assumenda non consequuntur natus! Expedita accusamus unde sit explicabo neque qui? Distinctio quos consectetur libero, reprehenderit at id aliquam possimus!</p>
                            <div class="tag">
                                <span  class="text">tag</span>
                                <span  class="text">tag</span>
                                <span  class="look-more">
                                    <a href="">
                                        <div class="look-more-text">MORE</div>
                                        <div class="arrow" aria-hidden="true">
                                            <i>→</i><i>→</i><i>→</i>
                                        </div>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-right-03">
                    <div class="card-head">
                        <div class="triangle-svg">
                            <svg viewBox="0 0 350 350" xmlns="http://www.w3.org/2000/svg">
                                <path d="M 160 44
                                        Q 180 15, 200 44
                                        L 265 214
                                        Q 270 235, 248 244
                                        L 96 244
                                        Q 80 230, 85 215
                                        Z" 
                                    fill="#666666"/>
                            </svg>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="title">
                            <div class="text">Title</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    padding: 10rem 14rem;
    background-color: $color-bg;
    .project-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .title {
            h1 {
                font-size: $font-size-giant;
                font-weight: 600;
            }
            .category {
                margin-top: 2.5rem;
                font-size: $font-size-base;
                font-weight: 400;
                color: $color-text-light;
                span {
                    padding: .5rem 1rem;
                    border: .5px solid $color-border;
                    border-radius: 50px;
                    margin-right: .5rem;
                }
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
    .project-body {
        margin: 8rem 0;
        .wrap-box {
            margin-bottom: 14rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 5rem; 
            .card-left-01 {
                flex: 2;
                .img {
                    width: 100%;
                    aspect-ratio: 2 / 1; 
                    border-radius: 60px;
                    background-color: $color-text-light;
                }
                .card-body {
                    margin-top: 1.5rem;
                    .title {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        .text {
                            font-size: $font-size-xxl;
                            font-weight: 500;
                        }
                        .time {
                            font-size: $font-size-lg;
                            font-weight: 400;
                            color: $color-text-light;
                        }
                    }
                    .description {
                        margin-top: 1rem;
                        p {
                            font-size: $font-size-base;
                            font-weight: 300;
                            color: $color-text-light;
                            text-align: justify;
                            line-height: 1.5rem;
                        }
                    }
                    .tag {
                        margin-top: 1.5rem;
                        font-size: $font-size-base;
                        font-weight: 400;
                        color: $color-text-light;
                        display: flex;
                        align-items: center;
                        margin-right: 0.5rem;      
                        flex-wrap: wrap;   
                        .text {
                            display: inline-flex;
                            padding: .5rem 1rem;
                            border: .5px solid $color-border;
                            border-radius: 50px;
                            margin-right: .5rem;
                        }
                        .look-more {
                            margin-left: auto;
                            flex: 0 0 auto;
                            text-align: right;
                            --gap: .75rem;
                            --dur: .36s;
                            a {
                            display: inline-flex;
                            align-items: center;
                            gap: var(--gap);
                            text-decoration: none;
                            color: $color-text;
                            .look-more-text {
                                font-size: $font-size-xl;
                                font-weight: 500;
                                transition: transform var(--dur) ease;
                            }
                            .arrow {
                                font-size: $font-size-xl;
                                position: relative;
                                display: inline-grid;
                                grid-auto-flow: column;
                                grid-auto-columns: 1.2em;
                                overflow: hidden;
                                width: 1.2em;
                                transition: width var(--dur) ease;
                                i {
                                    display: inline-block;
                                    transform: translateX(-100%);
                                    opacity: 0;
                                    transition: transform var(--dur) ease, opacity var(--dur) ease;
                                    &:nth-child(1) {
                                        transform: translateX(0);
                                        opacity: 1;
                                    }
                                }
                            }
                            &:hover,
                            &:focus-visible {
                                color: $color-text;
                                    .description { transform: translateX(.2rem); }
                                    .arrow {
                                        width: 4em;
                                        i {
                                            transform: translateX(0);
                                            opacity: 1;
                                            &:nth-child(2) { transition-delay: .04s; }
                                            &:nth-child(3) { transition-delay: .08s; }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .card-right-01 {
                flex: 1;
                .circle-img {
                    max-width: 350px;
                    height: 100%;
                    aspect-ratio: 1 / 1; 
                    background-color: $color-text-light;
                    border-radius: 50%;
                }
                .card-body {
                    margin-top: 1.5rem;
                    .title {
                        .text {
                            font-size: $font-size-xxl;
                            font-weight: 500;
                        }
                    }
                }
            }
            .card-right-02 {
                flex: 1;
                .circle-img {
                    max-width: 350px;
                    height: 100%;
                    aspect-ratio: 1 / 1; 
                    background-color: $color-text-light;
                    border-radius: 50%;
                }
                .inorganic {
                    --r: 90px;                        // 圓角
                    --overlap: 10px;                  // 重疊量
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .pill {
                        flex: 1;                        // 讓它跟著容器伸縮
                        max-width: 110px;               // 限制最大寬度
                        aspect-ratio: 1 / 3;            // 膠囊比例 (寬:高 = 1:3，可以依你要的比例調)
                        border-radius: calc(var(--r) * 1.5);
                        background: $color-text-light;
                        position: relative;
                    }

                    .pill + .pill {
                        margin-left: calc(-1 * var(--overlap));
                    }
                }
                .card-body {
                    margin-top: 1.5rem;
                    .title {
                        .text {
                            font-size: $font-size-xxl;
                            font-weight: 500;
                        }
                    }
                }
            }
            .card-left-02 {
                flex: 2;
                .img {
                    width: 100%;
                    aspect-ratio: 2 / 1; 
                    border-radius: 60px;
                    background-color: $color-text-light;
                }
                .card-body {
                    margin-top: 1.5rem;
                    .title {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        .text {
                            font-size: $font-size-xxl;
                            font-weight: 500;
                        }
                        .time {
                            font-size: $font-size-lg;
                            font-weight: 400;
                            color: $color-text-light;
                        }
                    }
                    .description {
                        margin-top: 1rem;
                        p {
                            font-size: $font-size-base;
                            font-weight: 300;
                            color: $color-text-light;
                            text-align: justify;
                            line-height: 1.5rem;
                        }
                    }
                    .tag {
                        margin-top: 1.5rem;
                        font-size: $font-size-base;
                        font-weight: 400;
                        color: $color-text-light;
                        display: flex;
                        align-items: center;
                        margin-right: 0.5rem;      
                        flex-wrap: wrap;   
                        .text {
                            display: inline-flex;
                            padding: .5rem 1rem;
                            border: .5px solid $color-border;
                            border-radius: 50px;
                            margin-right: .5rem;
                        }
                        .look-more {
                            /* 把 look-more 推到右邊並避免被擠壓 */
                            margin-left: auto;
                            flex: 0 0 auto;
                            text-align: right;
                            --gap: .75rem;
                            --dur: .36s;
                            a {
                            display: inline-flex;
                            align-items: center;
                            gap: var(--gap);
                            text-decoration: none;
                            color: $color-text;
                            .look-more-text {
                                font-size: $font-size-xl;
                                font-weight: 500;
                                transition: transform var(--dur) ease;
                            }
                            .arrow {
                                font-size: $font-size-xl;
                                position: relative;
                                display: inline-grid;
                                grid-auto-flow: column;
                                grid-auto-columns: 1.2em;
                                overflow: hidden;
                                width: 1.2em;
                                transition: width var(--dur) ease;
                                i {
                                    display: inline-block;
                                    transform: translateX(-100%);
                                    opacity: 0;
                                    transition: transform var(--dur) ease, opacity var(--dur) ease;
                                    &:nth-child(1) {
                                        transform: translateX(0);
                                        opacity: 1;
                                    }
                                }
                            }
                            &:hover,
                            &:focus-visible {
                                color: $color-text;
                                    .description { transform: translateX(.2rem); }
                                    .arrow {
                                        width: 4em;
                                        i {
                                            transform: translateX(0);
                                            opacity: 1;
                                            &:nth-child(2) { transition-delay: .04s; }
                                            &:nth-child(3) { transition-delay: .08s; }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .card-left-03 {
                flex: 2;
                .img {
                    width: 100%;
                    aspect-ratio: 2 / 1; 
                    border-radius: 60px;
                    background-color: $color-text-light;
                }
                .card-body {
                    margin-top: 1.5rem;
                    .title {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        .text {
                            font-size: $font-size-xxl;
                            font-weight: 500;
                        }
                        .time {
                            font-size: $font-size-lg;
                            font-weight: 400;
                            color: $color-text-light;
                        }
                    }
                    .description {
                        margin-top: 1rem;
                        p {
                            font-size: $font-size-base;
                            font-weight: 300;
                            color: $color-text-light;
                            text-align: justify;
                            line-height: 1.5rem;
                        }
                    }
                    .tag {
                        margin-top: 1.5rem;
                        font-size: $font-size-base;
                        font-weight: 400;
                        color: $color-text-light;
                        display: flex;
                        align-items: center;
                        margin-right: 0.5rem;      
                        flex-wrap: wrap;   
                        .text {
                            display: inline-flex;
                            padding: .5rem 1rem;
                            border: .5px solid $color-border;
                            border-radius: 50px;
                            margin-right: .5rem;
                        }
                        .look-more {
                            margin-left: auto;
                            flex: 0 0 auto;
                            text-align: right;
                            --gap: .75rem;
                            --dur: .36s;
                            a {
                            display: inline-flex;
                            align-items: center;
                            gap: var(--gap);
                            text-decoration: none;
                            color: $color-text;
                            .look-more-text {
                                font-size: $font-size-xl;
                                font-weight: 500;
                                transition: transform var(--dur) ease;
                            }
                            .arrow {
                                font-size: $font-size-xl;
                                position: relative;
                                display: inline-grid;
                                grid-auto-flow: column;
                                grid-auto-columns: 1.2em;
                                overflow: hidden;
                                width: 1.2em;
                                transition: width var(--dur) ease;
                                i {
                                    display: inline-block;
                                    transform: translateX(-100%);
                                    opacity: 0;
                                    transition: transform var(--dur) ease, opacity var(--dur) ease;
                                    &:nth-child(1) {
                                        transform: translateX(0);
                                        opacity: 1;
                                    }
                                }
                            }
                            &:hover,
                            &:focus-visible {
                                color: $color-text;
                                    .description { transform: translateX(.2rem); }
                                    .arrow {
                                        width: 4em;
                                        i {
                                            transform: translateX(0);
                                            opacity: 1;
                                            &:nth-child(2) { transition-delay: .04s; }
                                            &:nth-child(3) { transition-delay: .08s; }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .card-right-03 {
                flex: 1;
                .triangle-svg {
                    max-width: 350px;
                    height: 100%;
                    aspect-ratio: 1 / 1; 
                    align-self: flex-start;
                    svg {
                        width: 100%;
                        height: 100%;
                    }
                }
                .card-body {
                    margin-top: 1.5rem;
                    .title {
                        .text {
                            font-size: $font-size-xxl;
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }
}
</style>