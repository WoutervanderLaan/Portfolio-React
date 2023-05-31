import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAboutDoc } from "../../utils/firebase/firebase.utils";

import { setAboutText } from "../../store/about/about.reducer";

import Navigation from "../../components/navigation/navigation.component";
import Footer from "../../components/footer/footer.component";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAboutText = async () => {
      try {
        const [{ text }] = await getAboutDoc();
        dispatch(setAboutText(text));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAboutText();
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Footer />
    </>
  );
};

export default Home;
