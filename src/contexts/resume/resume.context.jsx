import { createContext, useState, useEffect } from "react";

import { getResumeDocs } from "../../utils/firebase/firebase.utils";
import RESUME_BACKUP_ITEMS from "../../backup/resume-backup-items";

export const ResumeContext = createContext([]);

const ResumeProvider = ({ children }) => {
  const [resumeItems, setResumeItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getResumeDocs();
      data ? setResumeItems(data) : setResumeItems(RESUME_BACKUP_ITEMS);
    };
    getData();
  }, []);

  const value = { resumeItems };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

export default ResumeProvider;
