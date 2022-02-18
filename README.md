<style>
    *,
     :after,
     :before {
        background-repeat: no-repeat;
        box-sizing: inherit
    }
    
     :after,
     :before {
        text-decoration: inherit;
        vertical-align: inherit
    }
    
    html {
        box-sizing: border-box;
        cursor: default;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%
    }
    
    article,
    aside,
    footer,
    header,
    nav,
    section {
        display: block
    }
    
    body {
        margin: 0
    }
    
    h1 {
        font-size: 2em;
        margin: .67em 0
    }
    
    figcaption,
    figure,
    main {
        display: block
    }
    
    figure {
        margin: 1em 40px
    }
    
    hr {
        box-sizing: initial;
        height: 0;
        overflow: visible
    }
    
    nav ol,
    nav ul {
        list-style: none
    }
    
    pre {
        font-family: monospace, monospace;
        font-size: 1em
    }
    
    a {
        background-color: initial;
        -webkit-text-decoration-skip: objects
    }
    
    abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted
    }
    
    b,
    strong {
        font-weight: inherit;
        font-weight: bolder
    }
    
    code,
    kbd,
    samp {
        font-family: monospace, monospace;
        font-size: 1em
    }
    
    dfn {
        font-style: italic
    }
    
    mark {
        background-color: #ff0;
        color: #000
    }
    
    small {
        font-size: 80%
    }
    
    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: initial
    }
    
    sub {
        bottom: -.25em
    }
    
    sup {
        top: -.5em
    }
    
     ::selection {
        background-color: #b3d4fc;
        color: #000;
        text-shadow: none
    }
    
    audio,
    canvas,
    iframe,
    img,
    svg,
    video {
        vertical-align: middle
    }
    
    audio,
    video {
        display: inline-block
    }
    
    audio:not([controls]) {
        display: none;
        height: 0
    }
    
    img {
        border-style: none
    }
    
    svg {
        fill: currentColor
    }
    
    svg:not(:root) {
        overflow: hidden
    }
    
    table {
        border-collapse: collapse
    }
    
    button,
    input,
    optgroup,
    select,
    textarea {
        margin: 0
    }
    
    button,
    input,
    select,
    textarea {
        background-color: initial;
        color: inherit;
        font-size: inherit;
        line-height: inherit
    }
    
    button,
    input {
        overflow: visible
    }
    
    button,
    select {
        text-transform: none
    }
    
    [type=reset],
    [type=submit],
    button,
    html [type=button] {
        -webkit-appearance: button
    }
    
    [type=button]::-moz-focus-inner,
    [type=reset]::-moz-focus-inner,
    [type=submit]::-moz-focus-inner,
    button::-moz-focus-inner {
        border-style: none;
        padding: 0
    }
    
    [type=button]:-moz-focusring,
    [type=reset]:-moz-focusring,
    [type=submit]:-moz-focusring,
    button:-moz-focusring {
        outline: 1px dotted ButtonText
    }
    
    legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal
    }
    
    progress {
        display: inline-block;
        vertical-align: initial
    }
    
    textarea {
        overflow: auto;
        resize: vertical
    }
    
    [type=checkbox],
    [type=radio] {
        box-sizing: border-box;
        padding: 0
    }
    
    [type=number]::-webkit-inner-spin-button,
    [type=number]::-webkit-outer-spin-button {
        height: auto
    }
    
    [type=search] {
        -webkit-appearance: textfield;
        outline-offset: -2px
    }
    
    [type=search]::-webkit-search-cancel-button,
    [type=search]::-webkit-search-decoration {
        -webkit-appearance: none
    }
    
     ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit
    }
    
    details,
    menu {
        display: block
    }
    
    summary {
        display: list-item
    }
    
    canvas {
        display: inline-block
    }
    
    template {
        display: none
    }
    
    [tabindex],
    a,
    area,
    button,
    input,
    label,
    select,
    summary,
    textarea {
        touch-action: manipulation
    }
    
    [hidden] {
        display: none
    }
    
    [aria-busy=true] {
        cursor: progress
    }
    
    [aria-controls] {
        cursor: pointer
    }
    
    [aria-hidden=false][hidden]:not(:focus) {
        clip: rect(0, 0, 0, 0);
        display: inherit;
        position: absolute
    }
    
    [aria-disabled] {
        cursor: default
    }
    
     :root {
        --white: #fff;
        --neutral-5: #f7f9fc;
        --neutral-10: #eff2f9;
        --neutral-15: #e7eaf4;
        --neutral-20: #d9deeb;
        --neutral-30: #bec4d5;
        --neutral-40: #9fa6bb;
        --neutral-50: #828ba2;
        --neutral-60: #656e83;
        --neutral-70: #495163;
        --neutral-80: #303848;
        --neutral-90: #1e2532;
        --neutral-100: #0f141e;
        --blue-10: #eaf6ff;
        --blue-20: #c3e5fe;
        --blue-30: #92cdfc;
        --blue-40: #54aff8;
        --blue-50: #1a91f0;
        --blue-60: #1170cd;
        --blue-70: #10529b;
        --blue-80: #0f3871;
        --blue-90: #0c264c;
        --blue-100: #09162d;
        --indigo-10: #f1f2ff;
        --indigo-20: #dbdeff;
        --indigo-30: #bec2fe;
        --indigo-40: #9ba1fb;
        --indigo-50: #7a82f5;
        --indigo-60: #5660e8;
        --indigo-70: #343ecc;
        --indigo-80: #282b8f;
        --indigo-90: #1a1c6a;
        --indigo-100: #0e0f47;
        --green-10: #e7f4ed;
        --green-20: #c6e4d2;
        --green-30: #96d0ad;
        --green-40: #48ba75;
        --green-50: #339d5d;
        --green-60: #217d47;
        --green-70: #135c37;
        --green-80: #094025;
        --green-90: #042b18;
        --green-100: #01180d;
        --amber-10: #fff2cc;
        --amber-20: #fddb8c;
        --amber-30: #f9ba44;
        --amber-40: #ec930c;
        --amber-50: #cf760d;
        --amber-60: #a85a0e;
        --amber-70: #7f400d;
        --amber-80: #582c0c;
        --amber-90: #3e1d0a;
        --amber-100: #231007;
        --orange-10: #feebe3;
        --orange-20: #fdd2c0;
        --orange-30: #fbb092;
        --orange-40: #f68559;
        --orange-50: #ee571d;
        --orange-60: #bf4213;
        --orange-70: #8b3211;
        --orange-80: #5e240e;
        --orange-90: #3b180b;
        --orange-100: #1c0c06;
        --red-10: #ffeaec;
        --red-20: #ffd0d5;
        --red-30: #ffacb5;
        --red-40: #fe7d8b;
        --red-50: #fb4458;
        --red-60: #da0c22;
        --red-70: #a10e1d;
        --red-80: #6f0e19;
        --red-90: #470c12;
        --red-100: #24090c;
        --beige-10: #f3f1eb;
        --beige-20: #e1ddd2;
        --beige-30: #cbc3b3;
        --beige-40: #afa58f;
        --beige-50: #968a70;
        --beige-60: #776d59;
        --beige-70: #575041;
        --beige-80: #3c372d;
        --beige-90: #27241d;
        --beige-100: #15130f;
        --facebook-color: #3b5998;
        --twitter-color: #1da1f2;
        --linkedin-color: #0077b5;
        --youtube-color: #ff3d00;
        --pinterest-color: #cd1f28
    }
    
    @font-face {
        font-family: TT Commons;
        font-display: swap;
        font-weight: 400;
        font-style: normal;
        src: url(/packs/media/tt_commons/TTCommons-Regular-Subset-111ea87c.woff2) format("woff2"), url(/packs/media/tt_commons/TTCommons-Regular-Subset-5b879e7a.woff) format("woff")
    }
    
    @font-face {
        font-family: TT Commons;
        font-display: swap;
        font-weight: 600;
        font-style: normal;
        src: url(/packs/media/tt_commons/TTCommons-DemiBold-Subset-eb1d2e52.woff2) format("woff2"), url(/packs/media/tt_commons/TTCommons-DemiBold-Subset-0f77a15f.woff) format("woff")
    }
    
    @font-face {
        font-family: TT Commons;
        font-display: swap;
        font-weight: 700;
        font-style: normal;
        src: url(/packs/media/tt_commons/TTCommons-Bold-Subset-7eb6ce45.woff2) format("woff2"), url(/packs/media/tt_commons/TTCommons-Bold-Subset-f0ef2be6.woff) format("woff")
    }
    
    @font-face {
        font-family: TT Tricks;
        font-display: swap;
        font-weight: 400;
        font-style: normal;
        src: url(/packs/media/tt_tricks/TT-Tricks-Regular-e6b3a304.woff2) format("woff2"), url(/packs/media/tt_tricks/TT-Tricks-Regular-1e4836b6.woff) format("woff")
    }
    
    @font-face {
        font-family: TT Tricks;
        font-display: swap;
        font-weight: 700;
        font-style: normal;
        src: url(/packs/media/tt_tricks/TT-Tricks-Bold-630398fa.woff2) format("woff2"), url(/packs/media/tt_tricks/TT-Tricks-Bold-5d9dc609.woff) format("woff")
    }
    
    @font-face {
        font-family: TT Tricks;
        font-display: swap;
        font-weight: 400;
        font-style: italic;
        src: url(/packs/media/tt_tricks/TT-Tricks-Italic-c92b514d.woff2) format("woff2"), url(/packs/media/tt_tricks/TT-Tricks-Italic-630c0721.woff) format("woff")
    }
    
    @font-face {
        font-family: TT Tricks;
        font-display: swap;
        font-weight: 700;
        font-style: italic;
        src: url(/packs/media/tt_tricks/TT-Tricks-Bold-Italic-611e066e.woff2) format("woff2"), url(/packs/media/tt_tricks/TT-Tricks-Bold-Italic-209cb843.woff) format("woff")
    }
    
    body {
        font-size: 19px;
        line-height: 24px;
        position: relative;
        color: var(--neutral-90);
        font-weight: 400;
        background-color: var(--neutral-10);
        min-height: 100vh;
        overflow-x: hidden;
        font-family: TT Commons, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale
    }
    
    body.is-modal-open {
        width: 100%;
        height: 100%;
        overflow: hidden
    }
    
    .light-background-body {
        background-color: #f0f3f8
    }
    
    .white-background-body {
        background-color: var(--white)
    }
    
    a {
        color: inherit;
        text-decoration: none
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    p {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        margin: 0;
        padding: 0
    }
    
    input,
    textarea {
        caret-color: var(--blue-50);
        outline: none
    }
    
    button,
    input,
    textarea {
        font-family: inherit
    }
    
     :root {
        --vw: 1vw
    }
    
    .topbar {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        padding: 24px 0;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 900px;
        margin: 0 auto
    }
    
    .topbar:before {
        content: "";
        width: 0;
        height: 0
    }
    
    @media(max-width:1023px) {
        .topbar {
            padding: 16px
        }
        .topbar:before {
            display: none
        }
    }
    
    .topbar__logo {
        display: block;
        background-position: 50% 50%;
        background-size: contain;
        background-repeat: no-repeat;
        width: 112px;
        height: 28px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -56px;
        margin-top: -14px
    }
    
    @media(max-width:767px) {
        .topbar__logo {
            position: relative;
            top: 0;
            left: 0;
            margin: 0;
            background-position: 0 50%
        }
    }
    
    .topbar__button {
        display: inline-block;
        border: none;
        margin: 0;
        border-radius: 4px;
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
        background: var(--blue-50);
        color: var(--white);
        text-align: center;
        -webkit-user-select: none;
        user-select: none;
        white-space: nowrap;
        padding: 8px 16px;
        cursor: pointer;
        outline: none;
        transition: background-color .2s ease;
        will-change: background-color
    }
    
    .topbar__button:hover {
        background-color: var(--blue-70)
    }
    
    .topbar__action {
        display: inline-block;
        position: relative
    }
    
    .topbar__action-trigger {
        display: flex;
        position: relative;
        padding-left: 12px;
        padding-right: 8px
    }
    
    .topbar__action-trigger svg {
        margin-left: 2px
    }
    
    .topbar__action-menu {
        position: absolute;
        z-index: 5;
        right: 0;
        top: 100%;
        margin-top: 12px;
        padding: 10px 0;
        border-radius: 4px;
        background-color: var(--white);
        box-shadow: 0 2px 14px rgba(23, 68, 130, .15), 0 0 1px rgba(23, 68, 130, .2);
        transform-origin: 100% 0;
        transform: scale(.75) translateZ(0);
        opacity: 0;
        visibility: hidden
    }
    
    .topbar__action-menu.is-open {
        transform: scale(1) translateZ(0);
        opacity: 1;
        visibility: visible;
        transition-property: opacity, visibility, transform;
        transition-timing-function: ease-out;
        transition-duration: .1s
    }
    
    .topbar__action-menu-link {
        display: flex;
        align-items: center;
        white-space: nowrap;
        padding: 6px 28px 6px 16px;
        transition: color .15s;
        color: var(--neutral-90)
    }
    
    .topbar__action-menu-link:hover {
        color: var(--blue-50)
    }
    
    .topbar__action-menu-link:before {
        content: "";
        display: inline-block;
        margin-right: 8px;
        width: 24px;
        height: 24px;
        background-size: contain;
        background-repeat: no-repeat
    }
    
    .topbar__action-menu-link--pdf:before {
        background-image: url(/packs/media/formats/pdf-5d82b5cb.svg)
    }
    
    .topbar__action-menu-link--docx:before {
        background-image: url(/packs/media/formats/docx-1d33db94.svg)
    }
    
    .pdf-viewer {
        max-width: 900px;
        margin: 0 auto
    }
    
    @keyframes gradient {
        0% {
            background-position: -100vw 0
        }
        70% {
            background-position: 100vw 0
        }
        to {
            background-position: 100vw 0
        }
    }
    
    .pdf-viewer__error,
    .pdf-viewer__page {
        position: relative;
        overflow: hidden;
        border-radius: 6px;
        box-shadow: 0 20px 60px 0 rgba(186, 200, 227, .1), 0 16px 36px 0 rgba(186, 200, 227, .3);
        background-color: var(--white)
    }
    
    @media(max-width:767px) {
        .pdf-viewer__error,
        .pdf-viewer__page {
            box-shadow: none;
            border-radius: 0
        }
    }
    
    .pdf-viewer__page {
        padding-bottom: 141.389%;
        margin-bottom: 32px;
        background-repeat: no-repeat;
        background-position: 50% 0;
        background-size: 100% auto
    }
    
    @media(max-width:767px) {
        .pdf-viewer__page {
            margin-bottom: 12px
        }
    }
    
    .pdf-viewer__page:last-child {
        margin-bottom: 0
    }
    
    .pdf-viewer__page--loading:after,
    .pdf-viewer__page--loading:before {
        content: "";
        position: absolute;
        left: -1%;
        top: -1%;
        width: 102%;
        height: 102%
    }
    
    .pdf-viewer__page--loading:before {
        background-color: var(--neutral-10);
        background-image: linear-gradient(90deg, var(--neutral-10) 5%, var(--neutral-15) 15%, var(--neutral-10) 25%);
        background-size: 100vw 100vh;
        animation: gradient 1.5s linear infinite
    }
    
    .pdf-viewer__page--loading:after {
        transform: translateZ(0);
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTcyIiBoZWlnaHQ9Ijc4NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDU3MnY3ODZIMFYwem02NCAyNzR2MTRoNDQ0di0xNEg2NHptMCAzMHYxNGg0NDR2LTE0SDY0em0wIDMwdjE0aDQ0NHYtMTRINjR6bTAgMzB2MTRoMjA0di0xNEg2NHptMC0yMjZ2MTRoNDQ0di0xNEg2NHptMCAzMHYxNGg0NDR2LTE0SDY0em0wIDMwdjE0aDQ0NHYtMTRINjR6bTAgMzB2MTRoNDQ0di0xNEg2NHpNMjM2IDg2djEyaDEwMFY4NkgyMzZ6bS01MC0zNnYyNGgyMDBWNTBIMTg2eiIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
        background-repeat: no-repeat;
        background-position: 50% 0;
        background-size: cover
    }
    
    .pdf-viewer__page--error {
        background-image: url(/packs/media/sharing/placeholder-0162fd6f.png);
        background-position: 50% 50%;
        background-size: auto
    }
    
    @media(max-width:767px) {
        .pdf-viewer__page--error {
            background-size: 450px auto
        }
    }
    
    .pdf-viewer__page-links {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform: scaleY(-1)
    }
    
    .pdf-viewer__page-link {
        position: absolute
    }
    
    .pdf-viewer__error {
        padding: 60px 40px 80px
    }
    
    @media(max-width:767px) {
        .pdf-viewer__error {
            padding: 40px 20px 60px
        }
    }
    
    .pdf-viewer__error-image {
        max-width: 320px;
        margin: 0 auto 32px;
        background-image: url(/packs/media/images/error-31ea3ddd.svg);
        background-size: contain;
        background-repeat: no-repeat
    }
    
    .pdf-viewer__error-image:before {
        content: "";
        display: block;
        padding-bottom: 72.727%
    }
    
    .pdf-viewer__error-title {
        font-size: 28px;
        line-height: 30px;
        font-weight: 600;
        text-align: center
    }
    
    .resume {
        padding-bottom: 80px
    }
    
    @media(max-width:767px) {
        .resume {
            padding-bottom: 32px
        }
    }
</style>

<div class="resume">
    <div class="pdf-viewer" data-error-text="Caricamento del curriculum non riuscito" data-image-format="webp" data-ssid="pD1rMpMZz" data-version="51823a0aaf">
        <div class="pdf-viewer__page pdf-viewer__page--has-image" style="background-image: url(&quot;https://ssr.resume.tools/to-image/ssid-pD1rMpMZz-1.webp?cache=51823a0aaf&amp;size=675&quot;);">
            <div class="pdf-viewer__page-links">
                <a class="pdf-viewer__page-link" href="mailto:fabio.danubbio@gmail.com" rel="noreferrer noopener" style="left: 47.066%; top: 81.3515%; width: 20.5687%; height: 1.78171%;"></a>
            </div>
        </div>
        <div class="pdf-viewer__page pdf-viewer__page--has-image" style="background-image: url(&quot;https://ssr.resume.tools/to-image/ssid-pD1rMpMZz-2.webp?cache=51823a0aaf&amp;size=675&quot;);">
            <div class="pdf-viewer__page-links"></div>
        </div>
    </div>
</div>
