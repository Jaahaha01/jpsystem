export type Language = "th" | "en" | "jp";

export type Translations = typeof translations;

export const languages: Array<{ code: Language; label: string }> = [
  { code: "th", label: "TH" },
  { code: "en", label: "EN" },
  { code: "jp", label: "JP" },
];

export const translations = {
  en: {
    brand: "Japan System Thailand",
    nav: {
      home: "Home",
      solution: "Solution",
      newRelease: "New Release",
      itSystem: "IT System",
      eTax: "e-Tax Invoice & e-Receipt",

      marketing: "Marketing",
      myLogStar: "My Log Star",
      blog: "Blog",
      company: "Company",
      contact: "Contact",
    },
    common: {
      readMore: "READ MORE",

      learnMore: "Learn more",
      send: "Send message",
      sent: "Sent",
      copyright: "Copyright Japan System Co., Ltd. & Japan System (Thailand) Co., Ltd. All rights Reserved.",
      email: "Email",
      phone: "Phone",
      address: "Address",
      addressValue: "28th Fl., 253 Asoke Building, Sukhumvit 21 Rd., Khlong Toei Nuea, Watthana, Bangkok 10110.",
    },
    pages: {
      home: {
        metaTitle: "",
        hero: {

          title: "We will help your company with DX (Digital Transformation).",
          subtitle:
            "Minimal, precise, and engineered for enterprise—system development, e-Tax solutions, and DX marketing.",
          ctaPrimary: "Explore services",

        },
        services: {
          title: "Our Service",
          items: [
            {
              title: "IT System",
              desc: "Custom software development and system integration solutions tailored to your business needs.",
            },
            {
              title: "e-Tax Invoice & e-Receipt",
              desc: "Comprehensive tax management and compliance solutions for modern businesses.",
            },
            {
              title: "Website & Online marketing",
              desc: "Digital transformation and IT marketing strategies to boost your online presence.",
            },
            {
              title: "Mylogstar",
              desc: "Advanced security solutions and comprehensive logging systems for data protection.",
            },
            {
              title: "New Release",
              desc: "Expert consulting services to guide your digital transformation journey.",
            },
          ],
        },
      },
      newRelease: {
        metaTitle: "New Release",
        title: "New Release",
        subtitle: "Clean, focused product updates with enterprise polish.",
        eTaxHeading: "Refers to the use of tax invoices,",
        taxInvoiceSubtitle: "Tax Invoice (Paper medium)",
        costTable: {
          option: "Option",
          value: "Value",
          usePaper: "Use paper",
          usePaperVal: "0.8 Baht/set",
          printingFee: "Printing fee",
          printingFeeVal: "2 Baht/set",
          storageMaterial: "Storage material",
          storageMaterialVal: "0.02 Baht/set",
          deliveryFee: "Delivery fee (EMS)",
          deliveryFeeVal: "37 Baht/set",
          total: "Total",
          totalVal: "39.82 Baht",
        },
        monthlyCostLabel: "Monthly cost when the circulation is 1,000 copies / month",
        monthlyCostValue: "39.82 Baht x 1,000 = 39,820 Baht / month",
        monthlyCostReduction: "Monthly 39,820 baht + labor cost reduction!",

      },
      itSystem: {
        metaTitle: "IT System Solutions",
        title: "IT System",
        subtitle: "Feature-rich solutions delivered with thin-line precision.",
        productsTitle: "Products / Services",
        serviceItems: [
          { title: "Maintenance" },
          { title: "Website & Online Marketing" },
          { title: "IT Support & Help Desk" },
          { title: "Product Management System" },
        ],
        features: [
          { title: "Web Application", desc: "Scalable app delivery for modern enterprises." },
          { title: "Mobile & Tablet", desc: "High-quality UX across devices and contexts." },
          { title: "Integration", desc: "APIs, ERP, and workflow automation that fit." },
          { title: "Cloud & DevOps", desc: "Reliable CI/CD and infrastructure foundations." },
        ],
      },
      eTax: {
        metaTitle: "e-Tax Invoice & e-Receipt",
        title: "e-Tax Invoice & e-Receipt",

        painHeading: "Are you wasting your time on handwritten signatures on various documents?",
        painTitle: "Pain Points",
        painItems: [
          "Too many documents to sign",
          "Sometimes I have to go to the office just for one document",
          "The time to sign has become a burden on my work",
          "Get tired when signing",
          "Very troublesome because it is a sign of many",
        ],
        aboutTitle: "About e-Tax Invoice & e-Receipt and Digital Signature",
        aboutDesc: "In Japan System We support the introduction of e-Tax invoice & e-Receipt and digital signatures, one of the nine DX measures promoted by the Thai Revenue Service.",
        definitionEtaxTitle: "What is e-Tax Invoice & e-Receipt?",
        definitionEtaxDesc: "Refers to the use of tax invoices, electronic receipts, and digital signatures. Automatic date and time stamp.",
        definitionSigTitle: "What is a digital signature?",
        definitionSigDesc: "Digital signature and electronic signatures it is the information attached to the Invoice & Tax Invoice document sent to show the identity of the sender of the document. Not just placing a picture signature on the tax invoice but it also uses digital technology to prevent unauthorized use, signatures that enhance security and convenience with data encryption technology, including time stamps, etc.",
        benefitsTitle: "Benefits of introducing e-Tax Invoice & e-Receipt and digital signatures",
        benefits: [
          "Saving tax invoices on your own server or cloud server allows you to secure storage and without the risk of document loss.",
          "Copies of certifications are stored on the IRS server. (Tax office)",
          "There is no need to go to the office and sign.",
          "Eliminate the risk of misuse of signatures by clarifying who signed when and being able to verify them clearly.",
        ],
        mechanismTitle: "e-Tax Invoice & e-Receipt and Digital Signature Mechanism",
        introTitle: "For the introduction of e-Tax Invoice & e-Receipt and digital signatures,",
        introDesc: "In addition to the application process for various services It is also necessary to introduce (and build) a system that meets the requirements of the Thai Revenue Office, Japan System, operates everything from the application process to the introduction and processing of tax invoices, electronic receipts, and also digital signatures on electronic documents.",
        costTitle: "Cost reduction example by introducing e-Tax Invoice & e-Receipt",
        costSubtitle: "Tax Invoice (Paper medium)",
        costItems: [
          { label: "Use paper", price: "0.8 Baht/set" },
          { label: "Printing fee", price: "2 Baht/set" },
          { label: "Storage material", price: "0.02 Baht/set" },
          { label: "Delivery fee (EMS)", price: "37 Baht/set" },
        ],
        costTotal: "Total",
        costTotalValue: "39.82 Baht",
        costMonthlyLabel: "Monthly cost when the circulation is 1,000 copies / month",
        costMonthlyValue: "39.82 Baht × 1,000 = 39,820 Baht / month",
        costMonthlyReduction: "Monthly 39,820 baht + labor cost reduction!",
        contactBtn: "Contact",

      },
      marketing: {
        metaTitle: "DX & IT Marketing",
        title: "Marketing",

        heroTitle: "Website and Online Marketing",
        cardWebsite: "Website",
        cardOnlineMarketing: "Online Marketing",

      },
      myLogStar: {
        metaTitle: "My Log Star Detail",
        title: "My Log Star",

        heroTitle: "My log star",
        heroDesc: "What is log management? When you use a personal computer, information such as what software you used and which file you opened is recorded on your computer... (logs) contains a great deal of information, and a closer look reveals who, when, and what they were doing on their computer.",

        featureTitle: "MylogStar Features",
        featureLogCollectionTitle: "Log collection power",
        featureLogCollectionDesc: "Acquires logs at the kernel level of the OS, grasping operations that cannot be acquired by other log management products.",
        featureLogAvailabilityTitle: "Log availability",
        featureLogAvailabilityDesc: "Highly accurate logs for information leakage countermeasures and business improvement.",
        accordion: [
          { id: "fileServer", title: "My log star", content: "What is log management?\nWhen you use a personal computer, information such as what software you used and which file you opened is recorded on your computer. Also, when you visit a website using the Internet, you can keep a record of which page you visited on what day of the month. In addition, special systems can be used to collect more detailed information. The personal computer usage history collected in this way is called a \"log\". The log contains a great deal of information, and a closer look reveals who, when, and what they were doing on their computer.", images: 0 },
          { id: "desktop", title: "MylogStar Features", content: "Log collection power\nWhen managing logs, if the necessary logs cannot be collected, they cannot be saved or analyzed as a trail. MylogStar acquires logs at the kernel level of the OS, and can grasp operations that cannot be acquired by other log management products. Since highly accurate logs can be acquired, it can be effectively used for information leakage countermeasures and business improvement. When you use a personal computer, information such as what software you used and which file you opened is recorded on your computer. Also, when you visit a website using the Internet, you can keep a record of which page you visited on what day of the month. In addition, special systems can be used to collect more detailed information. The personal computer usage history collected in this way is called a \"log\". The log contains a great deal of information, and a closer look reveals who, when, and what they were doing on their computer.\n\nLog collection power\nI don't know when to use the collected logs. If you suspect an information leak, you may want to check the logs over the last few years. This log is meaningless unless it is available. MylogStar is a dedicated software for managing client operation logs, and provides user-friendly operation management that makes use of many years of experience.\n\nLog management to Support telework\nFrom security measures to business improvement with MylogStar", images: 0 },
          { id: "standalone", title: "My log Star FileServer", content: "Pinpoint monitoring of important servers Low price & high functionality! File server access log / audit log management\n\nLog monitoring is indispensable for measures against information leakage. However, for companies that own a huge number of servers or small and medium-sized companies that cannot devote a lot of resources to system management, it will be difficult to implement it on all systems. MylogStar FileServer monitors data input / output and user operations within the file server by narrowing down the monitoring target to the file server where confidential information is stored and installing it directly on the monitored server. It is a file server access log management software that maintains security. MylogStar FileServer also makes it possible to acquire audit logs. Audit logs are a record of operations performed by system administrators and users. The operation contents in the server are recorded as an audit log in chronological order and continuously (when, who, what did). There is no need to prepare a separate management server, and there is no need to install an agent on the PC, so log management is easy and inexpensive.", images: 1 },
          { id: "console", title: "My log star", content: "My log Star Desktop — \"Log management\" & \"device control\" that can be done immediately on a stand-alone PC or a small base\nMylogStar Desktop is log management and device control software that is ideal for environments with a small number of target PCs, such as PCs that cannot connect to the network and small bases. No management server is required, and it can be easily installed by simply installing it on the target PC. With the industry's top class log collection power, operation logs in the target PC can be uprooted and managed as a trail. In addition, the device control function controls the export of confidential data.\n\nLog management\nMylogStar Desktop — With the industry's top class log collection power, you can uproot the operation log in the target PC and keep it as a trail. The most worrisome thing about leaks from standalone PCs and mobile PCs is the removable disk. MylogStar Desktop records all file operations performed on local disks, network drives, etc., including removable disks. In addition, it also has a trace function, so even if a cover-up is performed by unauthorized operation, it can be identified immediately. With the screen snapshot function, you can also capture the screen when a specified event occurs.\n\nMylogStar 4 Standalone Manager\nMylogStar 4 Standalone Manager is MylogStar 4 — Logs of several machines on which Desktop is installed can be centrally collected, managed and viewed. In addition, MylogStar 4 Standalone including alert function and report function. There are also functions and operations that can be enhanced by using Manager.\n\n※ SQL Server is required to use Standalone Manager.\n※ The English version of MylogStar 4 Standalone Manager is a product to be developed, so we will let you know when it will be available.\n\nEasy-to-understand and simple management console\nThe management console of MylogStar Desktop is a simple and easy-to-understand management console so that even personnel who are not familiar with IT can easily check the logs.\n\nDevice control\nMylogStar Desktop's Access Control Option not only prohibits the use of USB devices uniformly, but also allows you to set detailed security policies such as allow, prohibit, and read-only when using USB storage. In addition, by using the \"USB whitelist\" function, it is possible to give permission to use only a specific USB storage based on the vendor ID, product ID, and serial number given to the USB storage. As a result, it is possible to enhance security by taking advantage of the convenience of USB storage without impairing business efficiency.", images: 1 },
        ],

      },
      company: {
        metaTitle: "Company Profile",
        title: "Company Profile",
        subtitle:
          "A calm, precise presence in Thailand—delivering Japanese-quality execution with local expertise.",
        about: {
          title: "About Our Company",
          body: "Japan System (Thailand) Co., Ltd. provides high-quality IT solutions, leveraging Japanese precision with local expertise.",
          imageAlt: "Minimal office building",
        },
        infoTitle: "Corporate Information",
        info: [
          {
            k: "Company Name",
            v: "Japan System Co., Ltd. & Japan System (Thailand) Co., Ltd.",
          },
          {
            k: "Address",
            v: "28th Fl., 253 Asoke Building, Sukhumvit 21 Rd., Khlong Toei Nuea, Watthana, Bangkok 10110.",
          },
          { k: "Establishment", v: "2015/12" },
          { k: "Capital", v: "2,000,000 THB" },
          { k: "Representative", v: "Tsubasa Hoshino" },
          { k: "Email", v: "info@jpsys-th.com" },
          { k: "Phone", v: "02-664-1674" },
        ],
      },
      contact: {
        metaTitle: "Contact",
        title: "Contact Us",
        subtitle: "If you have any questions or inquiries, please feel free to contact us.",
        form: {
          title: "Send us a message",
          companyName: "Company Name",
          name: "Name",
          email: "Email",
          subject: "Subject",
          message: "Message",
          note: "We’ll respond within 1–2 business days.",
        },
        office: {
          title: "Office",
          email: "info@jpsys-th.com",
          phone: "02-664-1674",
        },
      },
      blog: {
        metaTitle: "Blog & News",
        title: "Blog & News",
        subtitle: "News, articles and updates from Japan System Thailand",
        featured: "Featured",
        readMore: "Read article",
        backToBlog: "Back to Blog",
        allPosts: "All posts",
        noPosts: "No posts yet",
        latestUpdates: "Latest updates",
        contactUs: "Contact us",
      },


    },
    footer: {
      companyProfile: "Company Profile",
      contact: "Contact",
    },
  },
  th: {
    brand: "Japan System Thailand",
    nav: {
      home: "หน้าแรก",
      solution: "โซลูชัน",
      newRelease: "ข่าวสาร/ผลิตภัณฑ์ใหม่",
      itSystem: "ระบบ IT",
      eTax: "e-Tax Invoice & e-Receipt",

      marketing: "การตลาด",
      myLogStar: "My Log Star",
      blog: "บล็อก",
      company: "ข้อมูลบริษัท",
      contact: "ติดต่อเรา",
    },
    common: {
      readMore: "อ่านเพิ่มเติม",

      learnMore: "ดูเพิ่มเติม",
      send: "ส่งข้อความ",
      sent: "ส่งแล้ว",
      copyright: "Copyright Japan System Co., Ltd. & Japan System (Thailand) Co., Ltd. All rights Reserved.",
      email: "อีเมล",
      phone: "โทรศัพท์",
      address: "ที่อยู่",
      addressValue: "ชั้น 28, 253 อาคารอโศก, ถนนสุขุมวิท 21, คลองเตยเหนือ, วัฒนา, กรุงเทพฯ 10110",
    },
    pages: {
      home: {
        metaTitle: "พาร์ตเนอร์ IT สไตล์ Zen ญี่ปุ่น",
        hero: {

          title: "Japan System พร้อมช่วยเหลือบริษัทของคุณด้าน DX (Digital Transformation)",
          subtitle:
            "เรียบหรู แม่นยำ และออกแบบเพื่อองค์กร—พัฒนาระบบ, e-Tax และ DX/IT Marketing",
          ctaPrimary: "ดูบริการ",

        },
        services: {
          title: "บริการของเรา",
          items: [
            {
              title: "พัฒนาระบบ IT",
              desc: "ออกแบบสถาปัตยกรรมก่อนพัฒนา เพื่อคุณภาพ ความเร็ว และดูแลต่อได้ระยะยาว",
            },
            {
              title: "e-Tax Invoice & e-Receipt",
              desc: "ปรับกระบวนการเป็นดิจิทัล ลดต้นทุน และทำงานตามข้อกำหนดได้อย่างมั่นใจ",
            },
            {
              title: "การตลาด DX / IT",
              desc: "ตั้งแต่ข้อมูลจนถึงแคมเปญ | เชื่อมกลยุทธ์กับการลงมือทำด้วยเทคโนโลยี",
            },
            {
              title: "ความปลอดภัย & การบันทึก",
              desc: "รวมบันทึกตรวจสอบและระบบมอนิเตอร์ เพื่อรองรับ Governance และ Incident",
            },

            {
              title: "ที่ปรึกษา",
              desc: "Roadmap ที่ชัดเจนสำหรับผู้บริหาร สอดคล้องกับเป้าหมายธุรกิจ",
            },
          ],
        },
      },
      newRelease: {
        metaTitle: "ผลิตภัณฑ์ใหม่",
        title: "ผลิตภัณฑ์ใหม่",
        subtitle: "อัปเดตผลิตภัณฑ์แบบเรียบหรู พร้อมใช้งานในองค์กร",
        eTaxHeading: "หมายถึงการใช้ใบกำกับภาษี,",
        taxInvoiceSubtitle: "ใบกำกับภาษี (รูปแบบกระดาษ)",
        costTable: {
          option: "รายการ",
          value: "มูลค่า",
          usePaper: "ค่ากระดาษ",
          usePaperVal: "0.8 Baht/ชุด",
          printingFee: "ค่าพิมพ์",
          printingFeeVal: "2 Baht/ชุด",
          storageMaterial: "ค่าวัสดุจัดเก็บ",
          storageMaterialVal: "0.02 Baht/ชุด",
          deliveryFee: "ค่าจัดส่ง (EMS)",
          deliveryFeeVal: "37 Baht/ชุด",
          total: "รวม",
          totalVal: "39.82 Baht",
        },
        monthlyCostLabel: "ต้นทุนรายเดือนเมื่อจำนวนหมุนเวียน 1,000 ชุด / เดือน",
        monthlyCostValue: "39.82 Baht x 1,000 = 39,820 Baht / เดือน",
        monthlyCostReduction: "ประหยัดได้ 39,820 Baht/เดือน + ลดต้นทุนแรงงาน!",

      },
      itSystem: {
        metaTitle: "โซลูชันระบบ IT",
        title: "โซลูชันระบบ IT",
        subtitle: "โซลูชันครบ พร้อมไอคอนเส้นบางแบบมืออาชีพ",
        productsTitle: "ผลิตภัณฑ์ / บริการ",
        serviceItems: [
          { title: "บำรุงรักษาระบบ" },
          { title: "เว็บไซต์และการตลาดออนไลน์" },
          { title: "ฝ่ายสนับสนุนด้านไอทีและศูนย์บริการช่วยเหลือ" },
          { title: "ระบบจัดการสินค้า" },
        ],
        features: [
          { title: "Web Application", desc: "ระบบเว็บที่ขยายได้สำหรับองค์กร" },
          { title: "Mobile & Tablet", desc: "UX คุณภาพสูง ครอบคลุมทุกอุปกรณ์" },
          { title: "Integration", desc: "เชื่อมต่อ API/ERP/Workflow อย่างลงตัว" },
          { title: "Cloud & DevOps", desc: "CI/CD และโครงสร้างพื้นฐานที่เชื่อถือได้" },
        ],
      },
      eTax: {
        metaTitle: "e-Tax Invoice & e-Receipt",
        title: "e-Tax Invoice & e-Receipt",

        painHeading: "คุณกำลังเสียเวลาไปกับการเซ็นชื่อด้วยลายมือบนเอกสารต่าง ๆ อยู่หรือไม่?",
        painTitle: "ปัญหาที่พบบ่อย",
        painItems: [
          "เอกสารที่ต้องเซ็นมีจำนวนมาก",
          "บางครั้งต้องเข้าบริษัทเพื่อเซ็นเอกสารเพียง 1 ฉบับ",
          "เวลาที่ใช้ในการเซ็นกลายเป็นภาระของงาน",
          "เหนื่อย/ล้าจากการเซ็นเอกสาร",
          "ยุ่งยากมากเพราะต้องเซ็นหลายฉบับ",
        ],
        aboutTitle: "เกี่ยวกับ e-Tax Invoice & e-Receipt และลายเซ็นดิจิทัล",
        aboutDesc: "Japan System สนับสนุนการนำ e-Tax Invoice & e-Receipt และลายเซ็นดิจิทัลมาใช้ ซึ่งเป็นหนึ่งใน 9 มาตรการ DX ที่กรมสรรพากรไทยผลักดัน",
        definitionEtaxTitle: "e-Tax Invoice & e-Receipt คืออะไร?",
        definitionEtaxDesc: "หมายถึงการใช้ใบกำกับภาษี ใบเสร็จรับเงินอิเล็กทรอนิกส์ และลายเซ็นดิจิทัล พร้อมประทับวันที่และเวลาอัตโนมัติ",
        definitionSigTitle: "ลายเซ็นดิจิทัลคืออะไร?",
        definitionSigDesc: "ลายเซ็นดิจิทัลและลายเซ็นอิเล็กทรอนิกส์ คือข้อมูลที่แนบมากับเอกสาร Invoice & ใบกำกับภาษี เพื่อยืนยันตัวตนของผู้ส่งเอกสาร ไม่ใช่แค่การวางรูปลายเซ็นบนใบกำกับภาษี แต่ยังใช้เทคโนโลยีดิจิทัลเพื่อป้องกันการใช้งานโดยไม่ได้รับอนุญาต ลายเซ็นที่เพิ่มความปลอดภัยและความสะดวก พร้อมเทคโนโลยีเข้ารหัสข้อมูล รวมถึงการประทับเวลา เป็นต้น",
        benefitsTitle: "ประโยชน์ของการนำ e-Tax Invoice & e-Receipt และลายเซ็นดิจิทัลมาใช้",
        benefits: [
          "บันทึกใบกำกับภาษีบนเซิร์ฟเวอร์ของคุณเองหรือคลาวด์เซิร์ฟเวอร์ ช่วยให้จัดเก็บอย่างปลอดภัยโดยไม่มีความเสี่ยงที่เอกสารจะสูญหาย",
          "สำเนาใบรับรองถูกจัดเก็บบนเซิร์ฟเวอร์ของกรมสรรพากร",
          "ไม่จำเป็นต้องเดินทางไปที่สำนักงานเพื่อเซ็นเอกสาร",
          "ขจัดความเสี่ยงจากการใช้ลายเซ็นในทางที่ผิด ด้วยการระบุว่าใครเซ็นเมื่อไหร่ และสามารถตรวจสอบได้อย่างชัดเจน",
        ],
        mechanismTitle: "กลไกการทำงานของ e-Tax Invoice & e-Receipt และลายเซ็นดิจิทัล",
        introTitle: "สำหรับการนำ e-Tax Invoice & e-Receipt และลายเซ็นดิจิทัลมาใช้",
        introDesc: "นอกจากกระบวนการสมัครใช้บริการต่าง ๆ แล้ว ยังจำเป็นต้องนำระบบที่เป็นไปตามข้อกำหนดของกรมสรรพากรมาใช้ (และสร้างระบบ) Japan System ดำเนินการทุกอย่างตั้งแต่กระบวนการสมัครจนถึงการนำมาใช้และการดำเนินการเกี่ยวกับใบกำกับภาษี ใบเสร็จรับเงินอิเล็กทรอนิกส์ รวมถึงลายเซ็นดิจิทัลบนเอกสารอิเล็กทรอนิกส์",
        costTitle: "ตัวอย่างการลดต้นทุนจากการนำ e-Tax Invoice & e-Receipt มาใช้",
        costSubtitle: "ใบกำกับภาษี (รูปแบบกระดาษ)",
        costItems: [
          { label: "ค่ากระดาษ", price: "0.8 Baht/ชุด" },
          { label: "ค่าพิมพ์", price: "2 Baht/ชุด" },
          { label: "ค่าวัสดุจัดเก็บ", price: "0.02 Baht/ชุด" },
          { label: "ค่าจัดส่ง (EMS)", price: "37 Baht/ชุด" },
        ],
        costTotal: "รวม",
        costTotalValue: "39.82 Baht",
        costMonthlyLabel: "ต้นทุนรายเดือนเมื่อจำนวนหมุนเวียน 1,000 ชุด / เดือน",
        costMonthlyValue: "39.82 Baht × 1,000 = 39,820 Baht / เดือน",
        costMonthlyReduction: "ประหยัดได้ 39,820 Baht/เดือน + ลดต้นทุนแรงงาน!",
        contactBtn: "ติดต่อเรา",

      },
      marketing: {
        metaTitle: "การตลาด",
        title: "การตลาด",

        heroTitle: "เว็บไซต์และการตลาดออนไลน์",
        cardWebsite: "เว็บไซต์",
        cardOnlineMarketing: "การตลาดออนไลน์",

      },
      myLogStar: {
        metaTitle: "รายละเอียด My Log Star",
        title: "My Log Star",

        heroTitle: "My log star",
        heroDesc: "การจัดการ Log คืออะไร? เมื่อคุณใช้คอมพิวเตอร์ส่วนบุคคล ข้อมูลต่าง ๆ เช่น ซอฟต์แวร์ที่ใช้งานและไฟล์ที่เปิด จะถูกบันทึกไว้ในคอมพิวเตอร์ของคุณ... (Log) มีข้อมูลมากมาย และเมื่อตรวจสอบอย่างละเอียดจะทราบว่าใคร เมื่อไหร่ ทำอะไรบนคอมพิวเตอร์",

        featureTitle: "คุณสมบัติของ MylogStar",
        featureLogCollectionTitle: "พลังในการเก็บ Log",
        featureLogCollectionDesc: "เก็บ Log ในระดับ Kernel ของ OS จับการทำงานที่ผลิตภัณฑ์จัดการ Log อื่น ๆ ไม่สามารถทำได้",
        featureLogAvailabilityTitle: "ความพร้อมใช้งานของ Log",
        featureLogAvailabilityDesc: "Log ที่มีความแม่นยำสูง สำหรับมาตรการป้องกันข้อมูลรั่วไหลและการปรับปรุงธุรกิจ",
        accordion: [
          { id: "fileServer", title: "My log star", content: "การจัดการ Log คืออะไร?\nเมื่อคุณใช้คอมพิวเตอร์ส่วนบุคคล ข้อมูลต่าง ๆ เช่น ซอฟต์แวร์ที่คุณใช้และไฟล์ที่คุณเปิด จะถูกบันทึกไว้ในคอมพิวเตอร์ของคุณ นอกจากนี้ เมื่อคุณเข้าชมเว็บไซต์ผ่านอินเทอร์เน็ต คุณสามารถเก็บบันทึกว่าคุณเข้าชมหน้าใดในวันที่เท่าไหร่ของเดือน นอกจากนี้ยังสามารถใช้ระบบพิเศษเพื่อรวบรวมข้อมูลที่ละเอียดยิ่งขึ้น ประวัติการใช้งานคอมพิวเตอร์ที่รวบรวมในลักษณะนี้เรียกว่า \"Log\" Log มีข้อมูลจำนวนมาก และเมื่อตรวจสอบอย่างละเอียดจะเผยให้เห็นว่าใคร เมื่อไหร่ กำลังทำอะไรบนคอมพิวเตอร์ของตน", images: 0 },
          { id: "desktop", title: "MylogStar Features", content: "พลังในการเก็บ Log\nเมื่อจัดการ Log หากไม่สามารถเก็บ Log ที่จำเป็นได้ ก็ไม่สามารถบันทึกหรือวิเคราะห์เป็นร่องรอยได้ MylogStar เก็บ Log ในระดับ Kernel ของ OS และสามารถจับการทำงานที่ผลิตภัณฑ์จัดการ Log อื่น ๆ ไม่สามารถทำได้ เนื่องจากสามารถเก็บ Log ที่มีความแม่นยำสูง จึงใช้ได้อย่างมีประสิทธิภาพสำหรับมาตรการป้องกันข้อมูลรั่วไหลและการปรับปรุงธุรกิจ\n\nพลังในการเก็บ Log\nไม่ทราบว่าจะใช้ Log ที่เก็บรวบรวมไว้เมื่อไหร่ หากสงสัยว่ามีข้อมูลรั่วไหล อาจต้องตรวจสอบ Log ย้อนหลังหลายปี Log นี้จะไม่มีความหมายเว้นแต่จะพร้อมใช้งาน MylogStar เป็นซอฟต์แวร์เฉพาะทางสำหรับการจัดการ Log การทำงานของไคลเอนต์ และให้การจัดการการทำงานที่เป็นมิตรต่อผู้ใช้โดยใช้ประสบการณ์หลายปี\n\nการจัดการ Log เพื่อสนับสนุนการทำงานระยะไกล\nจากมาตรการรักษาความปลอดภัยไปจนถึงการปรับปรุงธุรกิจด้วย MylogStar", images: 0 },
          { id: "standalone", title: "My log Star FileServer", content: "การตรวจสอบเซิร์ฟเวอร์สำคัญแบบเจาะจุด ราคาประหยัดและมีฟังก์ชันสูง! การจัดการ Access Log / Audit Log ของ File Server\n\nการตรวจสอบ Log เป็นสิ่งจำเป็นสำหรับมาตรการป้องกันข้อมูลรั่วไหล อย่างไรก็ตาม สำหรับบริษัทที่มีเซิร์ฟเวอร์จำนวนมากหรือบริษัทขนาดเล็กถึงกลางที่ไม่สามารถทุ่มทรัพยากรจำนวนมากให้กับการจัดการระบบ การนำมาใช้กับทุกระบบจะเป็นเรื่องยาก MylogStar FileServer ตรวจสอบการนำเข้า/ส่งออกข้อมูลและการทำงานของผู้ใช้ภายใน File Server โดยจำกัดเป้าหมายการตรวจสอบไปที่ File Server ที่จัดเก็บข้อมูลลับและติดตั้งโดยตรงบนเซิร์ฟเวอร์ที่ถูกตรวจสอบ เป็นซอฟต์แวร์จัดการ Access Log ของ File Server ที่รักษาความปลอดภัย MylogStar FileServer ยังสามารถเก็บ Audit Log ได้ Audit Log เป็นบันทึกการทำงานที่ดำเนินการโดยผู้ดูแลระบบและผู้ใช้ เนื้อหาการทำงานในเซิร์ฟเวอร์จะถูกบันทึกเป็น Audit Log ตามลำดับเวลาอย่างต่อเนื่อง (เมื่อไหร่ ใคร ทำอะไร) ไม่จำเป็นต้องเตรียมเซิร์ฟเวอร์จัดการแยกต่างหาก และไม่จำเป็นต้องติดตั้ง Agent บน PC ดังนั้นการจัดการ Log จึงง่ายและประหยัด", images: 1 },
          { id: "console", title: "My log star", content: "My log Star Desktop — \"การจัดการ Log\" และ \"การควบคุมอุปกรณ์\" ที่ทำได้ทันทีบน PC แบบ Stand-alone หรือฐานขนาดเล็ก\nMylogStar Desktop เป็นซอฟต์แวร์จัดการ Log และควบคุมอุปกรณ์ที่เหมาะสำหรับสภาพแวดล้อมที่มี PC เป้าหมายจำนวนน้อย เช่น PC ที่ไม่สามารถเชื่อมต่อเครือข่ายและฐานขนาดเล็ก ไม่จำเป็นต้องมีเซิร์ฟเวอร์จัดการ และสามารถติดตั้งได้ง่ายเพียงแค่ติดตั้งบน PC เป้าหมาย ด้วยพลังการเก็บ Log ระดับสูงสุดในอุตสาหกรรม สามารถเก็บ Log การทำงานใน PC เป้าหมายได้อย่างครบถ้วนและจัดการเป็นร่องรอย นอกจากนี้ ฟังก์ชันควบคุมอุปกรณ์ยังควบคุมการส่งออกข้อมูลลับ\n\nการจัดการ Log\nMylogStar Desktop — ด้วยพลังการเก็บ Log ระดับสูงสุดในอุตสาหกรรม คุณสามารถเก็บ Log การทำงานใน PC เป้าหมายและเก็บไว้เป็นร่องรอย สิ่งที่น่าเป็นห่วงที่สุดเกี่ยวกับการรั่วไหลจาก PC แบบ Stand-alone และ PC เคลื่อนที่คือดิสก์แบบถอดได้ MylogStar Desktop บันทึกการทำงานไฟล์ทั้งหมดที่ดำเนินการบนดิสก์ในเครื่อง ไดรฟ์เครือข่าย ฯลฯ รวมถึงดิสก์แบบถอดได้ นอกจากนี้ยังมีฟังก์ชันติดตาม ดังนั้นแม้จะมีการปกปิดโดยการทำงานที่ไม่ได้รับอนุญาต ก็สามารถระบุได้ทันที ด้วยฟังก์ชัน Screen Snapshot คุณยังสามารถจับภาพหน้าจอเมื่อเกิดเหตุการณ์ที่กำหนด\n\nMylogStar 4 Standalone Manager\nMylogStar 4 Standalone Manager คือ MylogStar 4 — สามารถรวบรวม จัดการ และดู Log จากเครื่องหลายเครื่องที่ติดตั้ง Desktop ได้จากศูนย์กลาง นอกจากนี้ MylogStar 4 Standalone รวมถึงฟังก์ชันแจ้งเตือนและฟังก์ชันรายงาน ยังมีฟังก์ชันและการทำงานที่สามารถเพิ่มประสิทธิภาพได้โดยใช้ Manager\n\n※ จำเป็นต้องมี SQL Server เพื่อใช้งาน Standalone Manager\n※ เวอร์ชันภาษาอังกฤษของ MylogStar 4 Standalone Manager เป็นผลิตภัณฑ์ที่อยู่ระหว่างการพัฒนา เราจะแจ้งให้ทราบเมื่อพร้อมใช้งาน\n\nคอนโซลจัดการที่เข้าใจง่ายและเรียบง่าย\nคอนโซลจัดการของ MylogStar Desktop เป็นคอนโซลจัดการที่เรียบง่ายและเข้าใจง่าย เพื่อให้แม้แต่บุคลากรที่ไม่คุ้นเคยกับ IT ก็สามารถตรวจสอบ Log ได้อย่างง่ายดาย\n\nการควบคุมอุปกรณ์\nตัวเลือก Access Control ของ MylogStar Desktop ไม่เพียงแค่ห้ามใช้อุปกรณ์ USB อย่างเหมารวม แต่ยังช่วยให้คุณสามารถกำหนดนโยบายความปลอดภัยอย่างละเอียด เช่น อนุญาต ห้าม และอ่านอย่างเดียว เมื่อใช้ USB Storage นอกจากนี้ โดยใช้ฟังก์ชัน \"USB whitelist\" สามารถให้สิทธิ์ใช้งานเฉพาะ USB Storage ที่ระบุตาม Vendor ID, Product ID และ Serial Number ที่กำหนดให้กับ USB Storage ส่งผลให้สามารถเพิ่มความปลอดภัยโดยใช้ประโยชน์จากความสะดวกของ USB Storage โดยไม่กระทบประสิทธิภาพทางธุรกิจ", images: 1 },
        ],

      },
      company: {
        metaTitle: "ข้อมูลบริษัท",
        title: "ข้อมูลบริษัท Japan System (Thailand)",
        subtitle:
          "วิสัยทัศน์ที่ชัดเจนในไทย—คุณภาพงานแบบญี่ปุ่น ผสานความเชี่ยวชาญในท้องถิ่น",
        about: {
          title: "เกี่ยวกับบริษัท",
          body: "Japan System (Thailand) Co., Ltd. ให้บริการโซลูชัน IT คุณภาพสูง ผสมผสานความแม่นยำแบบญี่ปุ่นเข้ากับความเชี่ยวชาญในท้องถิ่น",
          imageAlt: "อาคารสำนักงานแบบมินิมอล",
        },
        infoTitle: "ข้อมูลนิติบุคคล",
        info: [
          {
            k: "ชื่อบริษัท",
            v: "Japan System Co., Ltd. & Japan System (Thailand) Co., Ltd.",
          },
          {
            k: "ที่อยู่",
            v: "ชั้น 28, 253 อาคารอโศก, ถนนสุขุมวิท 21, คลองเตยเหนือ, วัฒนา, กรุงเทพฯ 10110",
          },
          { k: "ก่อตั้ง", v: "2015/12" },
          { k: "ทุนจดทะเบียน", v: "2,000,000 THB" },
          { k: "ผู้แทน", v: "Tsubasa Hoshino" },
          { k: "อีเมล", v: "info@jpsys-th.com" },
          { k: "โทร", v: "02-664-1674" },
        ],
      },
      contact: {
        metaTitle: "ติดต่อเรา",
        title: "ติดต่อเรา",
        subtitle: "หากคุณมีคำถามหรือข้อสงสัยใด ๆ โปรดติดต่อเราได้เลย",
        form: {
          title: "ส่งข้อความถึงเรา",
          companyName: "ชื่อบริษัท",
          name: "ชื่อ",
          email: "อีเมล",
          subject: "หัวข้อ",
          message: "ข้อความ",
          note: "เราจะติดต่อกลับภายใน 1–2 วันทำการ",
        },
        office: {
          title: "สำนักงาน",
          email: "info@jpsys-th.com",
          phone: "02-664-1674",
        },
      },


    },
    footer: {
      companyProfile: "ข้อมูลบริษัท",
      contact: "ติดต่อเรา",
    },
  },
  jp: {
    brand: "Japan System Thailand",
    nav: {
      home: "ホーム",
      solution: "ソリューション",
      newRelease: "新製品",
      itSystem: "ITシステム",
      eTax: "e-Tax Invoice & e-Receipt",

      marketing: "マーケティング",
      myLogStar: "My Log Star",
      blog: "ブログ",
      company: "会社概要",
      contact: "お問い合わせ",
    },
    common: {
      readMore: "詳細を見る",
      viewDetails: "詳細",
      learnMore: "もっと見る",
      send: "送信",
      sent: "送信済み",
      copyright: "Copyright Japan System Co., Ltd. & Japan System (Thailand) Co., Ltd. All rights Reserved.",
      email: "メール",
      phone: "電話",
      address: "住所",
      addressValue: "28th Fl., 253 Asoke Building, Sukhumvit 21 Rd., Khlong Toei Nuea, Watthana, Bangkok 10110.",
    },
    pages: {
      home: {
        metaTitle: "モダン禅 IT パートナー",
        hero: {

          title: "Japan System では貴社の DX（デジタルトランスフォーメーション）をお手伝いいたします。",
          subtitle:
            "ミニマルで精緻。システム開発、e-Tax、DX/ITマーケティングを一貫して提供します。",
          ctaPrimary: "サービスを見る",

        },
        services: {
          title: "サービス",
          items: [
            {
              title: "ITシステム開発",
              desc: "設計から品質を担保し、拡張性と保守性を重視した実装を行います。",
            },
            {
              title: "e-Tax Invoice & e-Receipt",
              desc: "業務を電子化し、コスト削減とスピード向上を実現します。",
            },
            {
              title: "DX / ITマーケティング",
              desc: "分析から運用まで—戦略と実行をテクノロジーでつなぎます。",
            },
            {
              title: "セキュリティ / ログ",
              desc: "監査ログと可観測性の整備で、ガバナンスと運用を強化します。",
            },
            {
              title: "コンサルティング",
              desc: "経営層にも伝わるロードマップで意思決定を支援します。",
            },
          ],
        },
      },
      newRelease: {
        metaTitle: "新製品",
        title: "新発売",
        subtitle: "洗練されたプロダクト情報を、静かな余白で。",
        eTaxHeading: "税務請求書の利用について",
        taxInvoiceSubtitle: "税務請求書（紙媒体）",
        costTable: {
          option: "項目",
          value: "値",
          usePaper: "用紙代",
          usePaperVal: "0.8 Baht/セット",
          printingFee: "印刷費",
          printingFeeVal: "2 Baht/セット",
          storageMaterial: "保管資材",
          storageMaterialVal: "0.02 Baht/セット",
          deliveryFee: "配送料 (EMS)",
          deliveryFeeVal: "37 Baht/セット",
          total: "合計",
          totalVal: "39.82 Baht",
        },
        monthlyCostLabel: "月間発行数 1,000 部の場合の月額コスト",
        monthlyCostValue: "39.82 Baht x 1,000 = 39,820 Baht / 月",
        monthlyCostReduction: "月額 39,820 Baht + 人件費削減！",

      },
      itSystem: {
        metaTitle: "ITシステム",
        title: "ITシステム",
        subtitle: "薄い線と円形アイコンで、機能を端正に見せる。",
        productsTitle: "製品 / サービス",
        serviceItems: [
          { title: "メンテナンス" },
          { title: "ウェブサイト & オンラインマーケティング" },
          { title: "ITサポート & ヘルプデスク" },
          { title: "商品管理システム" },
        ],
        features: [
          { title: "Web Application", desc: "企業向けのスケーラブルな開発。" },
          { title: "Mobile & Tablet", desc: "端末を問わない高品質UX。" },
          { title: "Integration", desc: "API/ERP/業務連携を自然に。" },
          { title: "Cloud & DevOps", desc: "CI/CDと基盤で信頼性を担保。" },
        ],
      },
      eTax: {
        metaTitle: "e-Tax Invoice & e-Receipt",
        title: "e-Tax Invoice & e-Receipt",

        painHeading: "さまざまな書類への手書き署名に時間を浪費していませんか？",
        painTitle: "よくある課題",
        painItems: [
          "署名する書類が多すぎる",
          "1枚のために出社しなければならないことがある",
          "署名の時間が業務負担になっている",
          "署名作業に疲れてしまう",
          "大量に署名が必要でとても面倒",
        ],
        aboutTitle: "e-Tax Invoice & e-Receipt とデジタル署名について",
        aboutDesc: "Japan Systemでは、タイ歳入局が推進する9つのDX施策の一つである e-Tax Invoice & e-Receipt とデジタル署名の導入を支援しています。",
        definitionEtaxTitle: "e-Tax Invoice & e-Receipt とは？",
        definitionEtaxDesc: "電子請求書、電子領収書、デジタル署名の利用を指します。日付と時刻の自動スタンプ付き。",
        definitionSigTitle: "デジタル署名とは？",
        definitionSigDesc: "デジタル署名と電子署名は、Invoice・税務請求書に添付される情報で、送信者の身元を証明するものです。税務請求書に署名画像を貼るだけでなく、不正使用を防ぐためのデジタル技術を活用し、データ暗号化技術やタイムスタンプなどによりセキュリティと利便性を向上させる署名です。",
        benefitsTitle: "e-Tax Invoice & e-Receipt とデジタル署名の導入メリット",
        benefits: [
          "自社サーバーまたはクラウドサーバーに税務請求書を保存でき、書類紛失のリスクなく安全に保管できます。",
          "認証のコピーは歳入局サーバーに保管されます。（税務署）",
          "オフィスに行って署名する必要がありません。",
          "いつ誰が署名したかを明確にし、署名の悪用リスクを排除し、明確に検証できます。",
        ],
        mechanismTitle: "e-Tax Invoice & e-Receipt とデジタル署名の仕組み",
        introTitle: "e-Tax Invoice & e-Receipt とデジタル署名の導入にあたって",
        introDesc: "各種サービスの申請手続きに加えて、タイ歳入局の要件を満たすシステムの導入（構築）も必要です。Japan Systemは、申請手続きから税務請求書・電子領収書の導入・処理、さらに電子文書へのデジタル署名まで、すべてを一貫して対応します。",
        costTitle: "e-Tax Invoice & e-Receipt 導入によるコスト削減例",
        costSubtitle: "税務請求書（紙媒体）",
        costItems: [
          { label: "用紙代", price: "0.8 Baht/セット" },
          { label: "印刷費", price: "2 Baht/セット" },
          { label: "保管資材", price: "0.02 Baht/セット" },
          { label: "配送料 (EMS)", price: "37 Baht/セット" },
        ],
        costTotal: "合計",
        costTotalValue: "39.82 Baht",
        costMonthlyLabel: "月間発行数 1,000 部の場合の月額コスト",
        costMonthlyValue: "39.82 Baht × 1,000 = 39,820 Baht / 月",
        costMonthlyReduction: "月額 39,820 Baht + 人件費削減！",
        contactBtn: "お問い合わせ",

      },
      marketing: {
        metaTitle: "DX / ITマーケティング",
        title: "マーケティング",

        heroTitle: "ウェブサイトとオンラインマーケティング",
        cardWebsite: "ウェブサイト",
        cardOnlineMarketing: "オンラインマーケティング",

      },
      myLogStar: {
        metaTitle: "My Log Star 詳細",
        title: "My Log Star",

        heroTitle: "My log star",
        heroDesc: "ログ管理とは？パソコンを使用すると、使用したソフトウェアや開いたファイルなどの情報がコンピュータに記録されます...（ログ）には多くの情報が含まれており、詳しく調べると誰がいつ何をしていたかがわかります。",

        featureTitle: "MylogStarの特長",
        featureLogCollectionTitle: "ログ収集力",
        featureLogCollectionDesc: "OSのカーネルレベルでログを取得し、他のログ管理製品では取得できない操作を把握します。",
        featureLogAvailabilityTitle: "ログの活用性",
        featureLogAvailabilityDesc: "情報漏えい対策や業務改善に活用できる高精度なログ。",
        accordion: [
          { id: "fileServer", title: "My log star", content: "ログ管理とは？\nパソコンを使用すると、使用したソフトウェアや開いたファイルなどの情報がコンピュータに記録されます。また、インターネットを使ってウェブサイトを閲覧すると、何月何日にどのページを訪問したかの記録を残すことができます。さらに、特別なシステムを使用することで、より詳細な情報を収集することができます。このようにして収集されたパソコンの使用履歴は「ログ」と呼ばれます。ログには多くの情報が含まれており、詳しく調べると、誰が、いつ、コンピュータで何をしていたかがわかります。", images: 0 },
          { id: "desktop", title: "MylogStar Features", content: "ログ収集力\nログ管理において、必要なログが収集できなければ、証跡として保存・分析することができません。MylogStarはOSのカーネルレベルでログを取得し、他のログ管理製品では取得できない操作を把握できます。高精度なログが取得できるため、情報漏えい対策や業務改善に効果的に活用できます。\n\nログ収集力\n収集したログをいつ使うかわかりません。情報漏えいが疑われる場合、過去数年間のログを確認したいことがあります。このログは利用可能でなければ意味がありません。MylogStarはクライアント操作ログを管理する専用ソフトウェアであり、長年の経験を活かしたユーザーフレンドリーな操作管理を提供します。\n\nテレワークを支援するログ管理\nMylogStarによるセキュリティ対策から業務改善まで", images: 0 },
          { id: "standalone", title: "My log Star FileServer", content: "重要なサーバーをピンポイントで監視 低価格＆高機能！ファイルサーバーアクセスログ/監査ログ管理\n\nログ監視は情報漏えい対策に不可欠です。しかし、膨大な数のサーバーを所有する企業やシステム管理に多くのリソースを割けない中小企業にとって、すべてのシステムに導入するのは困難です。MylogStar FileServerは、機密情報が保存されているファイルサーバーに監視対象を絞り、監視対象のサーバーに直接インストールすることで、ファイルサーバー内のデータの入出力やユーザー操作を監視します。セキュリティを維持するファイルサーバーアクセスログ管理ソフトウェアです。MylogStar FileServerの導入により、監査ログの取得も可能になります。監査ログは、システム管理者やユーザーが行った操作の記録です。サーバー内の操作内容は、時系列で継続的に監査ログとして記録されます（いつ、誰が、何をした）。別途管理サーバーを準備する必要はなく、PCにエージェントをインストールする必要もないため、ログ管理が簡単かつ安価に行えます。", images: 1 },
          { id: "console", title: "My log star", content: "My log Star Desktop — スタンドアロンPCや小規模拠点ですぐにできる「ログ管理」と「デバイス制御」\nMylogStar Desktopは、ネットワークに接続できないPCや小規模拠点など、対象PCが少数の環境に最適なログ管理・デバイス制御ソフトウェアです。管理サーバーは不要で、対象PCにインストールするだけで簡単に導入できます。業界トップクラスのログ収集力で、対象PC内の操作ログを根こそぎ取得し、証跡として管理できます。さらに、デバイス制御機能により機密データの持ち出しを制御します。\n\nログ管理\nMylogStar Desktop — 業界トップクラスのログ収集力で、対象PC内の操作ログを根こそぎ取得し、証跡として保管できます。スタンドアロンPCやモバイルPCからの漏えいで最も心配なのは、リムーバブルディスクです。MylogStar Desktopは、リムーバブルディスクを含む、ローカルディスク、ネットワークドライブなどで行われたすべてのファイル操作を記録します。また、追跡機能も備えているため、不正操作による隠蔽が行われても即座に特定できます。スクリーンスナップショット機能により、指定したイベント発生時の画面をキャプチャすることもできます。\n\nMylogStar 4 Standalone Manager\nMylogStar 4 Standalone Managerは、MylogStar 4 — Desktopがインストールされた複数のマシンのログを一元的に収集、管理、閲覧できます。さらに、MylogStar 4 Standalone はアラート機能やレポート機能を含み、Managerを使用することで強化できる機能や操作もあります。\n\n※ Standalone Managerの利用にはSQL Serverが必要です。\n※ MylogStar 4 Standalone Managerの英語版は開発予定の製品です。提供開始時期が決まり次第お知らせいたします。\n\nわかりやすくシンプルな管理コンソール\nMylogStar Desktopの管理コンソールは、ITに詳しくない担当者でも簡単にログを確認できるよう、シンプルでわかりやすい管理コンソールです。\n\nデバイス制御\nMylogStar DesktopのAccess Control Optionは、USBデバイスの使用を一律に禁止するだけでなく、USBストレージ使用時に許可・禁止・読み取り専用などの詳細なセキュリティポリシーを設定できます。さらに、「USBホワイトリスト」機能を使用することで、USBストレージに付与されたベンダーID、プロダクトID、シリアル番号に基づいて、特定のUSBストレージのみに使用許可を与えることが可能です。これにより、業務効率を損なうことなく、USBストレージの利便性を活かしながらセキュリティを強化することができます。", images: 1 }
        ],

      },
      company: {
        metaTitle: "会社概要",
        title: "会社概要",
        subtitle:
          "タイでのビジョンを静かな余白で—日本品質の精度とローカルの知見を融合します。",
        about: {
          title: "私たちについて",
          body: "Japan System (Thailand) Co., Ltd. は、日本品質の精度とローカルの知見を融合し、高品質なITソリューションを提供しています。",
          imageAlt: "ミニマルなオフィスビル",
        },
        infoTitle: "会社情報",
        info: [
          {
            k: "会社名",
            v: "Japan System Co., Ltd. & Japan System (Thailand) Co., Ltd.",
          },
          {
            k: "住所",
            v: "28th Fl., 253 Asoke Building, Sukhumvit 21 Rd., Khlong Toei Nuea, Watthana, Bangkok 10110.",
          },
          { k: "設立", v: "2015/12" },
          { k: "資本金", v: "2,000,000 THB" },
          { k: "代表者", v: "Tsubasa Hoshino" },
          { k: "Email", v: "info@jpsys-th.com" },
          { k: "電話", v: "02-664-1674" },
        ],
      },
      contact: {
        metaTitle: "お問い合わせ",
        title: "お問い合わせ",
        subtitle: "ご質問やお問い合わせがございましたら、お気軽にお問い合わせください。",
        form: {
          title: "メッセージを送る",
          companyName: "会社名",
          name: "お名前",
          email: "メール",
          subject: "件名",
          message: "内容",
          note: "1〜2営業日以内にご連絡します。",
        },
        office: {
          title: "オフィス",
          email: "info@jpsys-th.com",
          phone: "02-664-1674",
        },
      },

    },
    footer: {
      companyProfile: "会社概要",
      contact: "お問い合わせ",
    },
  },
} as const;

