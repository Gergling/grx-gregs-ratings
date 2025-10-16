import { DocumentActionComponent, DocumentActionDescription, DocumentActionProps } from "sanity";

const REQUIRED_STATUS = 'ready';

export const createCustomPublishAction = (
  OriginalPublishAction: DocumentActionComponent
): DocumentActionComponent => {
  const CustomPublishAction = (props: DocumentActionProps): DocumentActionDescription => {
    const currentStatus = props.draft?.status;
    const isReadyToPublish = currentStatus === REQUIRED_STATUS;
    const originalAction = OriginalPublishAction(props);
    const title = isReadyToPublish 
      ? originalAction?.title || 'Publish'
      : `Must set status to "${REQUIRED_STATUS}" before publishing`;
    const disabled = originalAction?.disabled || !isReadyToPublish;
    const tone = isReadyToPublish ? originalAction?.tone || 'primary' : 'neutral';

    return {
      ...originalAction,
      disabled,
      title,
      label: 'Publish',
      tone,
    };
  };

  return CustomPublishAction;
};
