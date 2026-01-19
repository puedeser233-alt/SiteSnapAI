import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[#030712]">
            <div className="text-center">
                <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
                <p className="text-gray-400 mb-8">
                    Lo sentimos, la página que buscas no existe.
                </p>
                <Link
                    href="/"
                    className="btn-primary inline-block"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
