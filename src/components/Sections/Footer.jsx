import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import LogoIcon from "../../assets/svg/Logo";
export default function Footer() {
  return (
    <footer
      style={{ padding: "20px" }}
      className="bg-linear-to-br from-blue-600 to-purple-600 text-white  "
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* العمود الأول - الشعار */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <LogoIcon />
              </div>
            </div>
            <p
              style={{ margin: "30px 0 20px 0" }}
              className="text-gray-300 leading-relaxed"
            >
              نقدّم حلولاً منزلية متكاملة تساعدكم على إدارة أعمالكم اليومية
              بسهولة وراحة، مع التزام كامل بالأمان، والجودة، والسرعة في تقديم
              الخدمة.
            </p>
            <div className="space-y-2 text-gray-300 ">
              <div className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                <MapPin size={18} />
                <span>حلب سوريا</span>
              </div>
              <div className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                <Phone size={18} />
                <span dir="ltr">+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                <Mail size={18} />
                <span>info@company.com</span>
              </div>
            </div>
          </div>

          {/* العمود الثاني - روابط سريعة */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              روابط سريعة
              <span className="absolute bottom-0 right-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "الرئيسية", href: "home" },
                { name: "خدماتنا", href: "servecis" },
                { name: "ما نقدمه", href: "offering" },
                { name: "اتصل بنا", href: "#" },
                { name: "سياسة الخصوصية", href: "#" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-2 bg-purple-500 rounded-full transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث - السوشال ميديا */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              تابعنا
              <span className="absolute bottom-0 right-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            </h3>
            <p className="text-gray-300 mb-6">
              تابعنا على وسائل التواصل الاجتماعي للحصول على آخر التحديثات
              والعروض
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Facebook, color: "hover:bg-blue-600", label: "فيسبوك" },
                { icon: Twitter, color: "hover:bg-sky-500", label: "تويتر" },
                {
                  icon: Instagram,
                  color: "hover:bg-pink-600",
                  label: "انستقرام",
                },
                {
                  icon: Linkedin,
                  color: "hover:bg-blue-700",
                  label: "لينكد إن",
                },
                { icon: Youtube, color: "hover:bg-red-600", label: "يوتيوب" },
                { icon: Mail, color: "hover:bg-purple-600", label: "البريد" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg group`}
                  aria-label={social.label}
                >
                  <social.icon
                    size={22}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            {/* <div className="mt-8">
              <h4 className="font-semibold mb-3">اشترك في النشرة البريدية</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  اشترك
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
            <span className="text-purple-400 font-semibold mx-2"> Ehab </span>|
          </p>
          <p> صنع بكل ❤️ من قبل Ehab</p>
        </div>
      </div>
    </footer>
  );
}
