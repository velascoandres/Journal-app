import { useState } from 'react';

export type ChangeInputCallback = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type SubmitCallback = (e: React.FormEvent<HTMLFormElement>) => void;
export type UseForm = <T>(initial: T) => [T, ChangeInputCallback, SubmitCallback];


export const useForm: UseForm = <T>(initial: T) => {
    const [formState, setFormState] = useState<T>(initial);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: filter logic
    };

    return [formState, onChange, handleSubmit];
};
