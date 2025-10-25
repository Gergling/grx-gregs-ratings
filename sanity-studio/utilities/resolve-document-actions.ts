import { DocumentActionComponent, DocumentActionsContext, DocumentActionsResolver } from "sanity";
// import { createCustomPublishAction } from "./create-custom-publish-action";

export const resolveDocumentActions: DocumentActionsResolver = (
  prevActions: DocumentActionComponent[],
  context: DocumentActionsContext
) => {
  if (context.schemaType === 'post') {
    return prevActions.map((Action) => {
      // if (Action.action === 'publish') {
      //   // Custom publish action for posts only.
      //   return createCustomPublishAction(Action);
      // }
      return Action;
    });

  }
  
  return prevActions;
};
