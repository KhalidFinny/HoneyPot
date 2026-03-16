Honeypot — Design System v3

Personal finance tracker · Disney storybook warmth · Swiss typographic precision · Mobile-first single scroll


Changelog v3

Tower silhouette redrawn from reference image — accurate Rapunzel tower anatomy (narrow stone spire base, wooden balcony platform, octagonal room, multi-spired purple conical roof)
Canyon cliff walls and waterfall added to silhouette
Rapunzel hair removed from silhouette (no yellow lines)
Tower is now position: fixed bottom-anchored, scrolls with viewport
FAB confirmed as circle-only, 56px, no label
All input spinners stripped on both webkit and moz engines


01 · Design Philosophy
Two forces in tension, held in balance:
Storybook WarmthSwiss PrecisionRapunzel's tower silhouette as full-page atmosphereSingle-column scroll, no tabs or navPlayfair Display serif for all display momentsStrict typographic hierarchy, no cards around textPooh-world language: Gathered, Scattered, TalesThin 1px rules between sections, never color blocksSoft pastels, rounded cards, italic chapter subtitlesUnderline-only inputs, no border boxesCanyon cliff walls and waterfall as background depthEverything readable first, decorative second
Five non-negotiable principles

Seamlessness — one background color #FFFBF7 top to bottom. No header color block. No card wrapping the balance. The tower silhouette is the page.
Balance number owns the page — 68px Playfair 900. Nothing competes.
Tower is atmosphere — fixed background SVG at 5.5–7% opacity. Felt, not seen. Never blocks content.
Modals for all CRUD — add, edit, view-all happen in bottom sheets. The main scroll is read-only.
FAB is the only add affordance — 56px circle, bottom-left, sticky. No other add buttons on the page.


02 · Color System
Palette
TokenHexRole--bg#FFFBF7Page background — single, unbroken--wh#FFFFFFCard surfaces, modal background, window highlights--rule#ECD8F0All 1px horizontal rules and input underlines--ink#1A0830Primary text, balance, headings, FAB, submit buttons--ink2#5A3878Secondary text, guide card body, close icon--ink3#A888C0Labels, hints, captions, metadata, dividers
Pink family — expenses, scattered, interaction
TokenHexUsage--pk#FFD0E8Scattered pill border, budget progress fill--pkl#FFF0F8Orb background (index 0), expense icon tint--pkd#B03070Expense amounts, italic name accent, deep category text
Yellow family — decisions, budget, honey
TokenHexUsage--y#FFE566Decide card border accent--yl#FFFAE8Decide card background, orb background (index 2)--yd#8A6400Text on yellow fills, warn state text
Blue family — runway, guidance
TokenHexUsage--bl#C0DCFFGuide card border, orb tint (index 1)--bll#EEF6FFGuide card background, orb background (index 1)--bld#1A5898Guide card text, guide icon, blue orb icon color
Green family — income, gathered, safe states
TokenHexUsage--gr#B8EAA0Gathered pill border, safe alert border--grl#EDFAE4Gathered pill bg, safe alert bg, orb background (index 3)--grd#1E6010Income amounts, safe state text, gathered split value
Semantic — danger
TokenHexUsage--rd#FFAAAADanger border, budget overrun fill--rdl#FFF0F0Danger background, delete hover background--rdd#881818Danger text and icons, delete hover icon

03 · Typography
Typefaces
FontWeightsUsagePlayfair Display400, 700, 900Balance, section titles, amounts, modal headings, runway number, split valuesPlayfair Display Italic400i, 700iChapter subtitle, decide/budget prompt, empty states, hintsDM Sans300, 400, 500, 600All UI — labels, body copy, buttons, inputs, metadata, categories
Type scale
RoleFontSizeWeightColorNotesBalancePlayfair Display68px900--ink / --pkd negLetter-spacing −3px, line-height 0.95Runway numberPlayfair Display72px900--inkRaw on page, no card, letter-spacing −3pxGreeting namePlayfair Display36px700--inkHello, *Sophia.* — italic em in --pkdSection titlePlayfair Display19px700--inkLetter-spacing −0.3pxTx amountPlayfair Display15px700--ink exp / --grd incDecide inputPlayfair Display30px700--inkUnderline-only border, italic placeholderBudget inputPlayfair Display22px700--inkUnderline-only borderSplit values (Gathered/Scattered)Playfair Display24px700--grd / --pkdChapter subtitlePlayfair Display Italic13px400i--ink3Empty statesPlayfair Display Italic14px400i--ink3CenteredBudget hintPlayfair Display Italic12px400i--ink3Guide titlePlayfair Display15px700--inkRunway titlePlayfair Display16px700--inkTx nameDM Sans13px600--inkTruncated with ellipsisTx metadataDM Sans11px400--ink3"Category · Time"Greeting timeDM Sans10px600--ink33px letter-spacing, uppercaseBalance eyebrowDM Sans9px600--ink33px letter-spacing, uppercaseSplit labelDM Sans9px600--ink32.5px letter-spacing, uppercaseGuide bodyDM Sans13px400--ink2Line-height 1.6Note textDM Sans13px400State colorLine-height 1.6Runway subtitleDM Sans12px400--ink3Budget metaDM Sans12px400--ink3Section action ("See all")DM Sans11px600--ink3See-more buttonDM Sans11px600--ink30.3px letter-spacingForm labelsDM Sans9px600--ink32px letter-spacing, uppercaseForm inputsDM Sans16px500--inkType toggleDM Sans13px600variesSubmit buttonDM Sans15px600#fffGuide buttonsDM Sans13px600--bld / #fffFAB has no label————Icon only

04 · Spacing & Layout
Page
Max width:     420px
Centering:     margin: 0 auto
Background:    #FFFBF7 — single color, never changes
Gutter:        28px left/right on all sections and modals
Bottom pad:    90px (clears the FAB completely)
Spacing tokens
ValueUsage4pxInternal icon-to-text gap6–8pxGap between orb and info, pill padding horizontal10–12pxBetween transaction rows (padding), pill vertical padding13–14pxOrb-to-info gap in rows16pxModal sheet-body top padding-top18pxSheet body padding-top, guide card padding20pxRunway gap between number and text24pxSection padding-top28pxPage gutter, modal horizontal padding, hero padding horizontal36pxModal bottom padding44pxHero top padding90pxFooter space (FAB clearance)
Border radius tokens
ValueUsage0Underline inputs — intentionally no radius2–3pxBudget progress bar, category bar6pxDelete button9pxCategory orbs10pxDecide ask button, guide action buttons11pxType toggle active state12–13pxDecision result pill, note rows13pxTransaction orbs14pxSubmit button, type toggle container18pxGuide card inner container20pxFAB radius (28px = 56/2)28px 28px 0 0Bottom sheet top corners only50%FAB perfect circle, guide icon circle, sheet close button

05 · The Rapunzel Tower Silhouette
Overview
The silhouette covers the full viewport height, anchored to the bottom, and scrolls with the viewport (not the page content). It is drawn from the official Tangled reference showing Rapunzel's tower in the canyon.
Positioning
cssposition: fixed;
bottom: 0;
left: 50%;
transform: translateX(-50%);
width: 420px;
height: 100vh;
pointer-events: none;
z-index: 0;
overflow: hidden;
SVG uses viewBox="0 0 420 900" with preserveAspectRatio="xMidYMax meet" so the tower base always sits at the bottom of the viewport.
All page content sits at z-index: 1 or higher.
Tower anatomy (from reference image)
The tower has seven distinct structural layers, rendered bottom-to-top:
1. Ground / cliff base (opacity 0.06)
Rocky ground mass with elliptical shadow. Jagged cliff edge path above it. The tower rises from a rocky promontory, not flat ground.
2. Stone spire base (opacity 0.055)
The most distinctive feature — a very tall, narrow stone column that widens very slightly from base to top. Not a rectangular box. Drawn as a tapered <path> to capture the organic rocky silhouette.
Stone texture: small <rect> bumps alternating left and right sides every ~40px of height.
Ivy vines: a <path> stroke climbing the left side with <circle> leaf clusters approximately every 35px from y=360 to y=710.
3. Wooden balcony platform (opacity 0.065)
The widest part of the tower — extends significantly beyond the stone base on both sides. This is the characteristic feature that makes it unmistakably Rapunzel's tower.

Platform floor: trapezoid <path> slightly wider at top
Vertical railing posts: eleven <rect> elements, 5px wide × 34px tall, spaced 12px apart
Top railing bar: single <rect> spanning full width
Hanging flower baskets: four <circle> elements between railing posts

4. Octagonal room above balcony (opacity 0.065)
Rounded rectangular room body with rx="8". Three arched windows rendered as white-filled <path> arches at 40% opacity to suggest light/glass.
Two angled wooden bracket supports connecting room base to balcony floor.
5. Purple conical roof (opacity 0.07)
The roof is the most complex element and must match the reference exactly:
ElementShapeNotesMain large cone<path> triangleWidest, tallest, centeredLeft secondary coneSmaller <path>Positioned left of mainRight secondary coneSmaller <path>Positioned right of mainLeft accent spireTiny <path>Smallest, outermost leftRight accent spireTiny <path>Smallest, outermost rightMain spire tip<path> + <rect>Needle tip at very topFlag<path> pennantOn main needleRoof ridge knobs<circle>Two decorative knobs on spireEave detail<path> strokeCurved line along roof base edgeTile linesTwo <path> strokesCurved lines suggesting tile rows
6. Canyon cliff walls (opacity 0.03)
Faint vertical cliff faces on far left and far right edges of the SVG. Left cliff: irregular <path> polygon. Right cliff: matching polygon. A waterfall on the right side: two overlapping <rect> elements with rounded corners and reduced opacity, suggesting falling water.
7. Ground vegetation (opacity 0.05)
Elliptical bush/tree shapes clustered around the base: two large (rx=38), two medium outer (rx=28), two small inner (rx=22). Distributed left and right.
Opacity summary
LayerOpacityReasonGround / cliff base0.06Slightly heavier to anchor the towerStone spire base0.055Main body, consistent with othersWooden balcony0.065Slightly more defined — key recognition elementOctagonal room0.065Matches balcony, important recognitionConical roof0.07Highest — roofline is most recognizable partCanyon cliffs0.03Very faint — pure atmosphereGround vegetation0.05Mid-weight, grounds the base
What is NOT in the silhouette

No Rapunzel hair (removed in v3)
No color — silhouette is fill="#1A0830" only (the ink color)
No shadows or filters
No separate star layer — removed for cleaner look
No animation


06 · Components
Balance hero zone
No card, no background change. Pure typography on --bg.
g-time          DM Sans 10px/600   uppercase 3px tracking    --ink3
g-name          Playfair 36px/700                             --ink
                "Hello, <em>Sophia.</em>" — em: italic --pkd
g-sub           Playfair italic 13px/400i                     --ink3  (time-aware)
bal-ey          DM Sans 9px/600    uppercase 3px tracking     --ink3  "your total treasure"
bal-sym         DM Sans 20px/300                              --ink3  "$"
bal-val         Playfair 68px/900  tracking:-3px lh:.95       --ink   (neg: --pkd)
bal-pill        inline-flex pill   11px/600 DM Sans            pos: grl/grd | neg: rdl/rdd
The bal-pill is the only colored element in the hero zone.
Split row (Gathered / Scattered)
border-top: 1px solid --rule
margin: 0 28px

Left item:   "GATHERED"  9px/600 DM Sans  --ink3
             value       24px/700 Playfair  --grd

Right item:  "SCATTERED"  9px/600 DM Sans  --ink3
             value        24px/700 Playfair  --pkd
             border-left: 1px solid --rule
             padding-left: 18px
Transaction row
Editorial list — no outer card wrapper. Each row has border-bottom: 1px solid --rule. Last row has none.
orb         40×40px   border-radius 13px   colored bg (index % 4)
icon        Lucide 16px   matching deep color
tx-name     DM Sans 13px/600   --ink   truncate with ellipsis
tx-meta     DM Sans 11px/400   --ink3  "Category · Time"
tx-amount   Playfair 15px/700   exp: --ink / inc: --grd
delete      24×24px circle, none→rdl bg on hover
Orb rotation (by index % 4):
Indexbg tokenbg hexicon color tokenicon hex0--pkl#FFF0F8--pkd#B030701--bll#EEF6FF--bld#1A58982--yl#FFFAE8--yd#8A64003--grl#EDFAE4--grd#1E6010
Runway display
No ring, no card, no background. Raw numbers on page.
rwy-n       Playfair 72px/900   tracking:-3px   --ink   (∞ when no expenses)
rwy-mo      DM Sans 9px/600     uppercase 1.5px tracking  --ink3  "months"
rwy-ttl     Playfair 16px/700   --ink
rwy-s       DM Sans 12px/400    --ink3
Runway states:
MonthsTitleSubtitle≥ 6Provisions plentyHealthy reserve — keep it up.≥ 3Tread gentlyA few months left — stay mindful.≥ 1Running lowUnder 3 months — time to replan.0The pot is emptySpending exceeds what was gathered.
Decide input zone
dec-intro   Playfair italic 13px/400i   --ink3   "Ask the honey pot…"
dec-inp     Playfair 30px/700   border-bottom: 2px solid --ink   no spinner
            placeholder: italic  --ink3
dec-btn     DM Sans 13px/600   bg: --ink   color: #fff   radius: 10px
            icon: lucide-sparkles
dec-res     DM Sans 13px/400   radius: 12px   colored pill

Result states:
  safe   bg: --grl   color: --grd   icon: check-circle
  warn   bg: --yl    color: --yd    icon: alert-triangle
  bad    bg: --rdl   color: --rdd   icon: alert-octagon
Budget zone
bud-intro   Playfair italic 13px/400i   --ink3   "Set a limit for scattered gold…"
bud-inp     Playfair 22px/700   border-bottom: 1.5px solid --rule   no spinner
            focus: border-color --ink
bud-track   4px height   radius: 3px   bg: --rule
bud-fill    normal: --pk   warn (>70%): --y   over (>90%): --rd
bud-meta    DM Sans 12px/400   --ink3
bud-hint    Playfair italic 12px/400i   --ink3
Budget hint copy:
% UsedHint≤ 70%The kingdom is well within its means.≤ 90%The treasury grows thin — ease the spending.≤ 100%Almost at the limit — tread carefully.> 100%The kingdom has overspent this chapter.
Gentle Guide card (conditional)
Only appears when exp > inc && inc > 0.
container   bg: --bll   radius: 18px   padding: 16px 18px
icon        28px circle   bg: --bl   icon: lucide-compass   color: --bld
title       Playfair 15px/700   --ink
body        DM Sans 13px/400   --ink2   line-height 1.6
buttons     flex row, gap 8px
  "Review Limits"   outline   border: --bl   color: --bld
  "Not Today"       filled    bg: --ink   color: #fff
Category rows
orb         32×32px   radius: 9px   same color rotation as tx orbs (index % 4)
icon        Lucide 13px
name        DM Sans 12px/600   --ink
value       DM Sans 12px/600   --ink   right-aligned
bar         3px height   radius: 2px   fill: --pkd
Note rows (Whispers from the Pot)
layout      flex, gap 10px, padding 11px 0, border-bottom 1px --rule
icon        Lucide 14px   color matches state
text        DM Sans 13px/400   line-height 1.6   color matches state

safe    icon: check-circle  /  sparkles       color: --grd
warn    icon: alert-triangle                  color: --yd
bad     icon: alert-octagon                   color: --rdd
FAB (Floating Action Button)
size          56px × 56px   border-radius: 50%
background    --ink  (#1A0830)
icon          lucide-plus   22px   color: #fff
position      sticky   bottom: 28px   left: 28px
shadow        0 6px 24px rgba(26,8,48,.28)
hover         bg → --ink2   transform: scale(1.06)
active        transform: scale(.96)
z-index       200
The FAB is the only add affordance on the page.
Bottom sheet modal
overlay       rgba(26,8,48,.50)   full viewport
sheet bg      --bg  (#FFFBF7)  — identical to page
radius        28px 28px 0 0
grip          36×4px   bg: --rule   centered   margin-top: 12px
title         Playfair 19px/700   --ink
close         28px circle   bg: --rule   icon: lucide-x   --ink2
max-height    90vh   overflow-y: auto
Type toggle (inside modal)
container     bg: --rule   radius: 14px   padding: 4px
inactive      bg: transparent   color: --ink3
active green  bg: #fff   color: --grd   shadow: 0 1px 6px rgba(0,0,0,.08)
active pink   bg: #fff   color: --pkd   shadow: 0 1px 6px rgba(0,0,0,.08)
Form fields (inside modal)
label       DM Sans 9px/600   uppercase   2px letter-spacing   --ink3
input       DM Sans 16px/500   --ink
            border: none
            border-bottom: 1.5px solid --rule
            background: transparent
            focus → border-color: --ink
            -webkit-appearance: none  (removes spinners)
            -moz-appearance: textfield (removes spinners)

07 · Interaction Patterns
Add / Edit flow

Tap FAB (56px circle, bottom-left)
Bottom sheet slides up, grip handle visible
Type toggle: Gathered (income) / Scattered (expense)
Two-column grid: Name (text) + Amount (number, no spinner)
Category select (full width)
Submit button full-width
On valid submit: entry added → modal closes → page re-renders
Dismiss: tap × button or tap dim overlay

View All flow

Lists cap at 5 entries on the main page
When more than 5 exist: "View all N tales" text appears (small, --ink3)
Tap opens a second bottom sheet with the complete list in the same row format
Delete from inside the modal updates the list live
If count drops to ≤5 after delete, "View all" disappears on next render

Decide checker
Fires on oninput — reactive, no button tap required (button also works).
ConditionStateIconNew balance would go negativeDangeralert-octagonRemaining runway < 1 monthDangeralert-octagonRemaining runway 1–3 monthsWarnalert-triangleRemaining runway ≥ 3 monthsSafecheck-circle
Smart notes (auto-generated on every render)
Priority order — first applicable rule also triggers the Guide card:
PriorityConditionStateCopy1exp > inc && inc > 0Danger — shows guide card"Spending has outpaced what was gathered this chapter."2Fun > 20% of total expWarn"Adventures are over 20% of spending — a little moderation helps."3Subscriptions total > $100Warn"Enchantments exceed $100 — review the forgotten ones."4Shopping > 15% of incomeWarn"Market finds are above 15% of gathered gold."5Balance > 0 and runway ≥ 4 monthsSafe"{n} months of provisions in reserve — the kingdom stands strong."FallbackNone of the aboveSafe"The honey pots are full and the kingdom is balanced."

08 · Storybook Language
Vocabulary map
Financial termStorybook termIncomeGatheredExpensesScatteredTransactionTaleNet balanceTotal Treasure / ProvisionsMonths of runwayHow Far We Can GoCategory breakdownWhere It WanderedMonthly budgetThe Kingdom BudgetSmart remindersWhispers from the PotDecision helperMay I Spend This?Spend check promptAsk the honey pot…Advisory cardA Gentle Guide
Chapter subtitles (time-aware)
Hour rangeChapterSubtitle00:00–05:59Chapter IA quiet night in the kingdom06:00–11:59Chapter IIA golden morning in the realm12:00–16:59Chapter IIIThe busy afternoon markets17:00–20:59Chapter IVThe tale of evening gold21:00–23:59Chapter VStars over the honey pot
Tone rules

Calm and warm — never frantic, never clinical
Use "provisions," "treasury," "kingdom," "the pot" naturally
Decision messages are factual + story-flavored, not sycophantic

✓ "The honey pot says hold off."
✓ "You may proceed — 6 months of provisions remaining."
✓ "Oh bother, provisions are running short."
✗ "Insufficient funds" — too cold
✗ "You've earned this, queen!" — too performative




09 · Icons
All icons: Lucide v0.441 loaded via CDN UMD, initialized with lucide.createIcons() after each DOM update.
Category icons
CategoryLucide iconRoyal Stipend (salary)crownFreelance Questpen-toolKingdom GiftgiftTreasury Yieldtrending-upCastle Keep (housing)homeProvisions (food)utensilsRoyal Carriage (transport)map-pinHealing Potions (health)heart-pulseEnchantments (subscriptions)scrollAdventures (fun)mapMarket Finds (shopping)shopping-bagLantern Oil (utilities)lampOther TreasuresparklesOther Wanderingsmoon
UI icons
ElementLucide iconFABplusDelete rowxModal closexGathered type toggletrending-upScattered type toggletrending-downSee more / view allchevron-rightDecide ask buttonsparklesGuide cardcompassSafe statuscheck-circleWarn statusalert-triangleDanger statusalert-octagonBalance safe pillcheck (11px)Balance danger pillalert-triangle (11px)Submit confirmcheck

10 · CSS Variables Reference
css:root {
  /* Page */
  --bg:    #FFFBF7;
  --wh:    #FFFFFF;
  --rule:  #ECD8F0;

  /* Ink scale */
  --ink:   #1A0830;
  --ink2:  #5A3878;
  --ink3:  #A888C0;

  /* Pink — expenses / scattered */
  --pk:    #FFD0E8;
  --pkl:   #FFF0F8;
  --pkd:   #B03070;

  /* Yellow — decisions / honey */
  --y:     #FFE566;
  --yl:    #FFFAE8;
  --yd:    #8A6400;

  /* Blue — runway / guide */
  --bl:    #C0DCFF;
  --bll:   #EEF6FF;
  --bld:   #1A5898;

  /* Green — income / gathered / safe */
  --gr:    #B8EAA0;
  --grl:   #EDFAE4;
  --grd:   #1E6010;

  /* Red — danger */
  --rd:    #FFAAAA;
  --rdl:   #FFF0F0;
  --rdd:   #881818;
}

11 · Page Scroll Order
The page scrolls in a single column in this exact order:
1.  Hero              greeting + balance number + status pill
2.  Split row         Gathered / Scattered totals
3.  Guide card        (conditional — only when overspending)
4.  Recent Tales      expense list, capped at 5
5.  ─ rule ─
6.  Gathered Gold     income list, capped at 5
7.  ─ rule ─
8.  How Far We Can Go runway number
9.  ─ rule ─
10. May I Spend This? decide input + result
11. ─ rule ─
12. The Kingdom Budget budget input + progress
13. ─ rule ─
14. Where It Wandered category breakdown bars
15. ─ rule ─
16. Whispers from Pot smart notes
17. Footer space      90px FAB clearance
Tower silhouette: position: fixed behind all of the above.
FAB: position: sticky floating above all of the above.

12 · Dos & Don'ts
Do

Keep --bg: #FFFBF7 from top to bottom — no background color changes anywhere
Let the balance number be the visually dominant element on every load
Use Playfair Display for every number, title, and display moment
Put the tower at ≤ 7% opacity — atmosphere only
Use position: fixed for the tower SVG so it stays in viewport during scroll
Use xMidYMax meet on the tower SVG so the base always grounds at the bottom
Make the FAB a perfect circle with no label text
Strip number input spinners on both -webkit-appearance and -moz-appearance
Call lucide.createIcons() after every DOM update that introduces new icons
Use thin 1px --rule lines as section dividers — never background color changes

Don't

Add a colored header block or hero background
Wrap the balance number in a card or give it a border
Use gradients anywhere in the UI
Add bottom navigation tabs
Use any color outside the defined 21-token palette
Use more than two typeface families
Reproduce the tower silhouette with cartoon colors — it must be --ink fill only
Include Rapunzel hair strokes in the tower SVG (removed in v3)
Use clinical financial language ("Insufficient funds", "Error: invalid amount")
Use performative compliments ("You've earned this, queen!")
Put scroll arrows / spinners on number inputs
Add any component not listed in this document without first checking if a simpler typographic solution exists