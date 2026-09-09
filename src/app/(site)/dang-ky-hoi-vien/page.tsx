import { MemberOnboardingForm } from "@/components/site/member-onboarding-form";

export default function MemberRegistrationPage() {
  return <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Dành cho doanh nghiệp</p><h1 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Đăng ký hội viên chính thức</h1><p className="mt-4 text-base leading-8 text-slate-600">Vui lòng điền đầy đủ thông tin doanh nghiệp và tải giấy tờ cần thiết. BIHUBA sẽ tiếp nhận hồ sơ để kích hoạt trang giới thiệu doanh nghiệp; nếu cần bổ sung, Văn phòng Hội sẽ liên hệ trực tiếp với Quý doanh nghiệp.</p></div><div className="mt-8"><MemberOnboardingForm /></div></div>;
}
