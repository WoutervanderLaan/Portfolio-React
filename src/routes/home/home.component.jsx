import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAboutDoc } from "../../utils/firebase/firebase.utils";

import { setAboutText } from "../../store/about/about.reducer";
import { selectAdminRef } from "../../store/admin/admin.selector";
import { auth } from "../../utils/firebase/firebase.utils";

import Navigation from "../../components/navigation/navigation.component";
import Footer from "../../components/footer/footer.component";

const Home = () => {
  const adminUID = useSelector(selectAdminRef);

  console.log(adminUID);
  console.log(auth.currentUser);

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
