import { serialize } from 'swr/_internal';

const INFINITE_PREFIX = '$inf$';
const getFirstPageKey = (getKey)=>{
    return serialize(getKey ? getKey(0, null) : null)[0];
};
const unstable_serialize = (getKey)=>{
    return INFINITE_PREFIX + getFirstPageKey(getKey);
};

export { unstable_serialize };
