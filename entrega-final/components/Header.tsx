import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ margin: 0 }}>Gestión de Albaranes</h1>
                <div>
                    <Link href="/register" style={{ marginRight: '15px', color: '#fff' }}>
                        Registrarse
                    </Link>
                    <Link href="/login" style={{ color: '#fff' }}>
                        Iniciar Sesión
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
