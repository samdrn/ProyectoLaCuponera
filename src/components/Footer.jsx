export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <p>© {new Date().getFullYear()} La Cuponera.</p>
                <p className="muted">Proyecto académico - Desarrollo Web II</p>
            </div>
        </footer>
    );
}