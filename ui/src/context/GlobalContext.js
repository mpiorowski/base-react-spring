import * as React from "react";
import {breadcrumbNameMap} from "../config/BreadcrumbsConfig";

const breadcrumbsInitialState = { breadcrumbs: breadcrumbNameMap, setBreadcrumbs: undefined };
const textInitialState = { text: "foo", setText: undefined };
const boolInitialState = { bool: false, setBool: undefined };

const BreadcrumbsStateContext = React.createContext(breadcrumbsInitialState);
const TextStateContext = React.createContext(textInitialState);
const BoolStateContext = React.createContext(boolInitialState);

/**
 * Global State provider & hooks
 */
export const GlobalStateProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = React.useState(breadcrumbsInitialState.breadcrumbs);
  const [text, setText] = React.useState(textInitialState.text);
  const [bool, setBool] = React.useState(boolInitialState.bool);
  const breadcrumbsContextValue = React.useMemo(() => ({breadcrumbs, setBreadcrumbs}), [breadcrumbs]);
  const textContextValue = React.useMemo(() => ({text, setText}), [text]);
  const boolContextValue = React.useMemo(() => ({bool, setBool}), [bool]);

  return (
    <BreadcrumbsStateContext.Provider value={breadcrumbsContextValue}>
      <TextStateContext.Provider value={textContextValue}>
        <BoolStateContext.Provider value={boolContextValue}>
          {children}
        </BoolStateContext.Provider>
      </TextStateContext.Provider>
    </BreadcrumbsStateContext.Provider>
  );
};

export const useBreadcrumbsState = () => React.useContext(BreadcrumbsStateContext);
export const useTextState = () => React.useContext(TextStateContext);
export const useBoolState = () => React.useContext(BoolStateContext);
