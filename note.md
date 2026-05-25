# บันทึกการแก้ไขและปรับปรุงโปรเจกต์ (Project Notes)

## ภาพรวมของโปรเจกต์
โปรเจกต์นี้คือ **เว็บไซต์องค์กร (Corporate Website)** สำหรับบริษัทผู้ให้บริการด้านระบบไอที (IT Solutions & Services) เช่น การวางระบบเครือข่าย, IT Support, E-Tax Invoice, MyLogStar และบริการด้าน Website/Online Marketing
- **เทคโนโลยีหลักที่ใช้:** Next.js 15, TypeScript, Tailwind CSS
- **ระบบจัดการเนื้อหา (CMS):** Strapi (สำหรับดึงข้อมูลเนื้อหาต่างๆ ผ่าน API) และอาจมี Sanity ติดตั้งไว้
- **ฟีเจอร์เด่น:** รองรับ 3 ภาษา (i18n) ได้แก่ ไทย (th), อังกฤษ (en), ญี่ปุ่น (ja) พร้อมระบบ Transition หน้าเว็บแบบสมูท (ZenLoader/PageTransition)

---

## สรุปปัญหาและการแก้ไขที่ได้ทำไปทั้งหมด

### 1. ปัญหา API Calls พุ่งสูงผิดปกติ (Strapi API Limit)
**ปัญหา:** เมื่อผู้ใช้งานกดสลับภาษา หรือสลับหน้าเว็บไปมา (Client Navigation) ยอด API Calls ในระบบหลังบ้านของ Strapi จะพุ่งสูงขึ้นอย่างรวดเร็ว ทำให้เสี่ยงต่อการเกิน Limit ของแพ็กเกจ
**การแก้ไข:**
- **ลบ `router.refresh()` ทิ้ง:** ในไฟล์ `LanguageSwitcher.tsx` ซึ่งเป็นตัวการทำให้ Next.js บังคับโหลดข้อมูลใหม่ทั้งหมดทุกครั้งที่สลับภาษา
- **เปิดใช้งาน Next.js Client Cache:** ใน Next.js 15 ระบบจะไม่จำแคชของ Dynamic Route เลย (StaleTime = 0) จึงได้เข้าไปเพิ่มการตั้งค่า `staleTimes: { dynamic: 60, static: 180 }` ในไฟล์ `next.config.ts` เพื่อให้บราวเซอร์จดจำหน้าเว็บที่เคยโหลดแล้วเป็นเวลา 1 นาทีโดยไม่ต้องยิง API ซ้ำเวลาสลับหน้าไปมา
- **บังคับ Data Cache ให้ Fetch:** เพิ่ม `cache: "force-cache"` ในฟังก์ชันดึงข้อมูลทั้งหมดใน `src/lib/strapi.ts`

### 2. เปลี่ยนสถาปัตยกรรมเว็บจาก Dynamic เป็น Static (SSG) แบบ 100%
**ปัญหา:** เว็บถูก Next.js มองว่าเป็นแบบ Dynamic (ต้องประมวลผลบนเซิร์ฟเวอร์ใหม่ทุกครั้งที่คนเข้า) ซึ่งเป็นผลมาจากการใช้คำสั่ง `cookies()` เพื่อเช็คสถานะ Loading Screen ในไฟล์ `layout.tsx`
**การแก้ไข:**
- ถอดการใช้ `cookies()` ออกจากฝั่งเซิร์ฟเวอร์ (ลบออกจาก `layout.tsx`)
- ย้ายลอจิกการซ่อน/แสดงหน้าโหลด (ZenLoader) ไปจัดการที่ฝั่งไคลเอนต์ผ่าน `useEffect` ในไฟล์ `ShellWrapper.tsx` 
**ผลลัพธ์:** ทั้งเว็บไซต์ถูกแปลงเป็น **Static HTML (SSG)** เวลารัน `npm run build` ระบบจะยิง API ไปหา Strapi แค่ครั้งเดียวเท่านั้น และเมื่อผู้ใช้เข้าเว็บ จะไม่มีการยิง API เพื่อขอข้อมูล JSON อีกเลย (0 API Calls Runtime)

### 3. แก้ไข Error ภาพแตกจาก Next.js Image Optimization
**ปัญหา:** มีแจ้งเตือน Error บนหน้า Console ว่า `The requested resource isn't a valid image... received null` 
**การแก้ไข:**
- สาเหตุเกิดจากการตั้งชื่อไฟล์ภาพสำรอง (Fallback Images) ในโฟลเดอร์ `public` มีการเว้นวรรคและใส่เครื่องหมาย `&` (เช่น `IT Support & Help Desk.png`) ซึ่งทำให้ Next.js Image Optimizer อ่าน URL พลาด
- ทำการ Rename ไฟล์รูปภาพให้ถูกต้องตามมาตรฐาน (เปลี่ยนเป็น `website-online-marketing.png`, `it-support-help-desk.png`, `product-management-system.png`, `maintenance.png`)
- อัปเดตชื่อไฟล์ใหม่ทั้งหมดในโค้ดไฟล์ `ITSystemClient.tsx` ทำให้รูปภาพกลับมาแสดงผลปกติและ Error หายไป

### 4. ตรวจสอบ Developer Warnings 
**ปัญหา:** มีการแจ้งเตือนใน Console เช่น ข้อมูล Deprecated ของ `Zustand` และเรื่อง Accessibility (a11y) ของ `DialogContent`
**ข้อสรุป:** อธิบายให้ผู้ใช้เข้าใจว่าสิ่งเหล่านี้เป็นเพียงคำเตือนของโค้ดจากไลบรารีเบื้องหลัง (เช่น Sanity Studio หรือ Radix UI) ซึ่งจะแสดงให้เห็นเฉพาะเวลานักพัฒนาเปิด Developer Tools ดูเท่านั้น **ไม่มีผลเสียใดๆ ต่อประสิทธิภาพหน้าเว็บ และผู้ใช้งานทั่วไปจะมองไม่เห็นแน่นอน 100%**
