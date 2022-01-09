import '../styles/Main.css'
const Main = () => {
    return (<>
        <section className="Main">
            <div className="Main_text">
                <h1>«Uzluksiz kasbiy ta’lim» elektron platformasi</h1>
                <p>Malaka oshirish uchun kurslar endi onlayn.
                    Qulayliklardan foydalaning va vaqtingizni tejang.</p>
                    <button className="btn btn-success">Malakani oshirishni Boshlash</button>
            </div>
            <div>
                <img src="https://www.qtlms.uz/images/intro_w.png" alt="jpg" />
            </div>
        </section>
    </>);
}
export default Main;