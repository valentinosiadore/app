import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerDiscount = () => {
    return ( 
        <div className="p-5 sm:p-20 text-center">
            <h2 className="uppercase font-black text-2xl text-primary">Consigue hasta un - %25 de descuento</h2>
            <h3 className="mt-3 font-semibold">- %20 porciento al gastar $15.000 ó - %25 al gastar $20.000. Usa el código de descuento CAFECITODESC</h3>

            <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
                <Link href="#" className={buttonVariants()}>Comprar</Link>
                <Link href="#" className={buttonVariants({variant: "outline"})}>Más información</Link>
            </div>
        </div>
     );
}
 
export default BannerDiscount;