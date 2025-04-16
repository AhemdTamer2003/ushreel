import Navbar from '../../components/Shared/Navbar'
import home from '../../assets/ushrealHome.png';
function Home() {
    return (
        <div className="h-screen" style={{ backgroundImage: `url(${home})` }}>
            <Navbar />
        </div>
    )
}

export default Home
