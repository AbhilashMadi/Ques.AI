import { Outlet } from 'react-router-dom';
import { logoImg, siderBgImg, siderLogoImg } from '@assets';

export default function LoginLayout() {
  // const { theme, setTheme } = useTheme();

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
      {/* Sider Section */}
      <section className="md:col-span-1 lg:col-span-2 bg-gradient-to-tl to-[#3A0B63] from-[#C37EFF] hidden md:flex relative overflow-hidden p-16">
        {/* Background image */}
        <img
          src={siderBgImg}
          alt="Decorative background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          height={200}
          width={200}
        // loading="lazy" // it is causing flashing on the screen and layout shift
        // decoding="async"
        />

        {/* Content container */}
        <div className="space-y-12 absolute z-10">
          {/* Logo */}
          <img
            src={siderLogoImg}
            height={60}
            width={250}
            alt="Ques.AI Logo"
            className="w-auto h-14"
          />

          {/* Taglines */}
          <div className="space-y-6 text-primary-foreground font-secondary">
            <h1 className="text-6xl">
              Your podcast will <br />no longer just a hobby.
            </h1>
            <h2 className="text-2xl">
              Supercharge Your Distribution <br />using our AI assistant
            </h2>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="flex flex-col justify-center-safe gap-10 p-24">
        {/* <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme}</button> */}
        <img
          src={logoImg}
          height={150}
          width={150}
          loading="lazy"
          decoding="async"
          className="mx-auto"
        />
        <Outlet />
      </section>
    </main >
  )
}