import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Première ligne existante */}
      <div className="h-screen flex flex-row items-center">
        <div className="items-center flex justify-center w-full pb-10">
          <Image
            src="/google-maps.png"
            alt="Google Maps"
            width={600}
            height={600}
          />
        </div>

        <div className="items-center flex justify-center w-full pb-12">
          <div className="w-[600px] h-[600px] flex flex-col justify-between">
            <div className="gap-7 flex flex-col">
              <h1 className="font-bold text-3xl pb-6">Krys Vincennes</h1>  
              <h2 className="text-xl">85 Rue de Fontenay</h2>
              <h3 className="text-l">A 5 min du RER A</h3>
              <h4 className="text-l">10 min du métro 1</h4>
            </div>

            <div className="bg-black text-white rounded-full px-6 py-3 flex items-center justify-center">
              <Link href='https://www.google.fr/maps/place/Opticien+Vincennes+-+Ch%C3%A2teau+-+Krys/@48.8481819,2.4349179,17z/data=!3m1!4b1!4m6!3m5!1s0x47e672a3cb1b0265:0x19a101b00d7e3199!8m2!3d48.8481794!4d2.4367386!16s%2Fg%2F1tjbrh19?hl=fr&entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D'>
                Ouvrir dans Google Maps
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-row items-center bg-gray-50">
        <div className="items-center flex justify-center w-full">
          <div className="w-[600px] h-[600px] flex flex-col justify-center">
            <h2 className="font-bold text-4xl mb-6">Faites votre examen de vue</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <p className="text-xl">Sur rendez-vous</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <p className="text-xl">Ajustement personnalisé</p>
              </div>
            </div>
          </div>
        </div>

        <div className="items-center flex justify-center w-full">
          <Image
            src="/photos/examen-de-vue.jpg"
            alt="Nos Services"
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}