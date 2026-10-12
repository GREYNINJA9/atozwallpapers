/**
 * Service catalogue — confirm list & prices with owner before publishing.
 * startingPrice stays null until TODO-CONFIRM.
 */
export const services = [
  {
    slug: 'wallpaper-installation',
    title: 'Wallpaper Installation Faridabad',
    h1: 'Wallpaper installation in Faridabad',
    primaryKeyword: 'wallpaper installation Faridabad',
    description:
      'Professional wallpaper installation across Faridabad and Delhi-NCR — neat seams, clean prep and clear timelines.',
    summary:
      'Supply-and-install or install-only (confirm with us). We plan seams around windows, AC units and feature walls.',
    startingPrice: null as string | null, // TODO-CONFIRM
    bullets: [
      'Surface prep guidance',
      'Pattern matching where required',
      'Faridabad & NCR coverage',
    ],
    body: [
      'Installation is the part visitors cannot judge from a catalogue photo. In Faridabad we hang on real apartment plaster, around AC machines, curtain pelmets and out-of-square corners. The job is measuring, planning the drop, pasting or using the specified adhesive, butting seams, and trimming at skirting and ceilings without scoring the paint next door.',
      'We prefer to supply and install so the paper, paste and wall are one conversation. Install-only on customer-supplied rolls is possible only if we have confirmed the product and condition of the walls — ask before you buy a bargain roll that we cannot guarantee.',
      'Prep is not glamorous: dry walls, filled cracks, and no active damp. We will pause if monsoon moisture is obvious. Timelines and rupee starting prices stay unpublished until the owner confirms them. Use the calculator for area, then book a visit from Sector 19.',
    ],
  },
  {
    slug: 'customised-wallpaper-design',
    title: 'Customised Wallpaper Design',
    h1: 'Customised wallpaper design',
    primaryKeyword: 'customised wallpaper Faridabad',
    description:
      'Customised and printed wallpaper design for Faridabad homes — from mood to print-ready artwork.',
    summary:
      'Bring inspiration photos; we help refine scale, colour and print suitability for your walls.',
    startingPrice: null, // TODO-CONFIRM
    bullets: ['Print-ready guidance', 'Sample / proof review', 'Install coordination'],
    body: [
      'Custom design is for walls that need a specific image, colour or scale that a stock roll will not give. We review your file or sketch, check whether it can print at wall size, and recommend a mural-style panel set versus a repeating custom pattern.',
      'Proofs matter. A phone mock-up is not a substitute for a printed strip in your Sector 19 or NIT lighting. We will not print copyrighted images you do not own. After approval, installation is scheduled like any other wallpaper job.',
      'This service pairs with the customised-printed collection page. Starting prices unpublished until confirmed. Free Consultation Book Karein if you already have artwork on a USB or WhatsApp.',
    ],
  },
  {
    slug: 'wall-panels',
    title: 'Wall Panels Faridabad',
    h1: 'Wall panels',
    primaryKeyword: 'wall panels Faridabad',
    description: 'Decorative wall panels as part of interior makeovers in Faridabad.',
    summary: 'Discuss panel options alongside wallpaper for TV walls and feature zones.',
    startingPrice: null, // TODO-CONFIRM
    bullets: ['Feature walls', 'Material options TBD', 'Paired with wallpaper'],
    body: [
      'Wall panels (slats, boards, framed inserts) are a physical alternative or partner to wallpaper on TV walls. We discuss them when a printed texture is not enough, or when cables need a service void. Exact materials and brands are TODO-CONFIRM with the owner — this page does not invent WPC, PU or teak lists.',
      'A typical Faridabad TV wall might combine a panelled centre with wallpaper or paint at the sides so the room does not feel like a showroom. Installation sequencing (panels first vs paper first) is decided on site.',
      'If you only need paper, stay on the wallpaper installation page. If you want a full room, see the makeover service. Starting prices unpublished until confirmed.',
    ],
  },
  {
    slug: 'flooring',
    title: 'Flooring Faridabad',
    h1: 'Flooring',
    primaryKeyword: 'flooring Faridabad interiors',
    description: 'Flooring discussions as part of full-room interior work in Faridabad.',
    summary: 'Confirm current flooring offerings with the owner before advertising specific materials.',
    startingPrice: null, // TODO-CONFIRM
    bullets: ['Scoped with room makeovers', 'Material list TODO-CONFIRM'],
    body: [
      'Flooring is listed because interiors conversations in Faridabad often jump from walls to floors in the same sitting. We will not advertise laminate, vinyl or stone ranges until the owner confirms what the studio actually supplies and installs.',
      'What we can say: wall colour and wallpaper scale should be chosen with the existing or planned floor in mind so you do not fight a heavy grain with a heavy mural. Bring floor photos to the wallpaper consult even if flooring is out of scope.',
      'Treat this page as a placeholder service description. Confirm offerings, prices and warranties before running ads to this URL.',
    ],
  },
  {
    slug: 'ceiling',
    title: 'Ceiling Work Faridabad',
    h1: 'Ceiling work',
    primaryKeyword: 'ceiling design Faridabad',
    description: 'Ceiling finishes discussed with wallpaper and full-room interiors in Faridabad.',
    summary: 'False ceiling and finish options — confirm exact capabilities with the studio.',
    startingPrice: null, // TODO-CONFIRM
    bullets: ['Coordinate with lighting', 'Scope TODO-CONFIRM'],
    body: [
      'Greater Faridabad societies often have builder false ceilings with downlighters that rake across wallpaper seams. Ceiling conversations therefore belong next to wallpaper, even when we are not the gypsum contractor. Exact ceiling services (new false ceiling, cove lighting, wallpaper on ceiling) are TODO-CONFIRM.',
      'Until confirmed, we coordinate: we need to know if you will add lights after we hang, because extra holes in a mural are painful. Mention ceiling plans in the optional details on the contact form.',
      'Do not assume we run a full electrical or gypsum crew. Ask. Starting prices unpublished.',
    ],
  },
  {
    slug: 'full-room-makeover',
    title: 'Full-Room Makeover Faridabad',
    h1: 'Full-room makeover',
    primaryKeyword: 'interior designer Sector 19 Faridabad',
    description:
      'Full-room interior makeovers centred on wallpaper, panels and coordinated finishes in Faridabad.',
    summary:
      'Ideal when you want walls, and related finishes, planned together — consult → sample → install.',
    startingPrice: null, // TODO-CONFIRM
    bullets: ['Single point of contact', 'Phased delivery', 'Sector 19 studio access'],
    body: [
      'A full-room makeover in our studio means one consult that covers wallpaper plus the extras you actually need (panels, and flooring or ceiling only if confirmed). It is not a promise of turnkey architecture. We are honest about that so Google Ads visitors are not surprised.',
      'The process stays Consult → Design & Sample → Install. Phasing matters in occupied Faridabad homes: living room first, bedrooms later, kids’ room when school holidays allow. We work from Sector 19 across NIT, Greater Faridabad and Ballabgarh.',
      'Bring a room-by-room list, not a Pinterest dump of palaces. We will map each wall to a collection page and a service. Starting prices unpublished until the owner confirms a makeover band. Free Consultation Book Karein.',
    ],
  },
] as const;

export type Service = (typeof services)[number];
