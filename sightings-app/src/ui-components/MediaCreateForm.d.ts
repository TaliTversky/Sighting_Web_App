/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MediaCreateFormInputValues = {
    Image?: string;
    specie?: string;
    Date?: string;
    time?: string;
    place?: string;
    type?: string;
    quality?: number;
    lifeStage?: string[];
    activity?: string[];
    characters?: string[];
    behavior?: string[];
    observationID?: string;
};
export declare type MediaCreateFormValidationValues = {
    Image?: ValidationFunction<string>;
    specie?: ValidationFunction<string>;
    Date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    place?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    quality?: ValidationFunction<number>;
    lifeStage?: ValidationFunction<string>;
    activity?: ValidationFunction<string>;
    characters?: ValidationFunction<string>;
    behavior?: ValidationFunction<string>;
    observationID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MediaCreateFormOverridesProps = {
    MediaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Image?: PrimitiveOverrideProps<TextFieldProps>;
    specie?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    place?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    quality?: PrimitiveOverrideProps<TextFieldProps>;
    lifeStage?: PrimitiveOverrideProps<SelectFieldProps>;
    activity?: PrimitiveOverrideProps<TextFieldProps>;
    characters?: PrimitiveOverrideProps<TextFieldProps>;
    behavior?: PrimitiveOverrideProps<TextFieldProps>;
    observationID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MediaCreateFormProps = React.PropsWithChildren<{
    overrides?: MediaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MediaCreateFormInputValues) => MediaCreateFormInputValues;
    onSuccess?: (fields: MediaCreateFormInputValues) => void;
    onError?: (fields: MediaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MediaCreateFormInputValues) => MediaCreateFormInputValues;
    onValidate?: MediaCreateFormValidationValues;
} & React.CSSProperties>;
export default function MediaCreateForm(props: MediaCreateFormProps): React.ReactElement;
