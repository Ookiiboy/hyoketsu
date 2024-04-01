export type FormErrorProps = {
  /**
   * Id for this error message. This is important for associating an input to its error message.
   */
  id: string;
  /** The error message */
  children: string;
};

export function FormError(props: FormErrorProps) {
  return (
    <span id={props.id} className="c-form-error">
      {props.children}
    </span>
  );
}
