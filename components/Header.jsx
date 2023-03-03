'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function Header({}) {
    const pathname = usePathname().split("/");
    const currentArea = pathname[2];
    const recipeId = pathname[3];

  return (
    <div className="py-5 bg-slate-300 flex items-center justify-between px-2">
        <div>
            <Link href="/">
                <h1 className="text-blue-700 font-bold text-5xl text-center">Foode</h1>
            </Link>
        </div>
        {pathname && currentArea && 
            <Link
                className="bg-blue-500 text-white p-4 text-xs rounded font-bold"
                href={recipeId ? `/types/${currentArea}` : `/types`}
            >
                Back to {recipeId ? `${currentArea} recipes` : 'recipe types'}
            </Link>}
    </div>
  )
}
