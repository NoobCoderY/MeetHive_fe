import React from "react";
import FeedbackDialog from "../components/feedback-dialog";
import FeedbackDialogBtn from "../components/feedback-dialog-btn";

const FeedbackDialogPage = () => {
    const [feedbackDialogOpen, setFeedbackDialogOpen] = React.useState(false);
  return (
      <>
          <FeedbackDialogBtn
              setFeedbackDialogOpen={setFeedbackDialogOpen}
          />
          <FeedbackDialog
              feedbackDialogOpen={feedbackDialogOpen}
              setFeedbackDialogOpen={setFeedbackDialogOpen}
          />
      </>
  );
}

export default FeedbackDialogPage;
