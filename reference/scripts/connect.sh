#!/bin/bash

# SSH Connect
#
# Connects to the server
# ${REMOTE_ROOT_PATH}
#

DIR="$(dirname "${BASH_SOURCE[0]}")"

# Include files
INCLUDE_FILES=(
            "common/defaults.sh"
            ".env.sh"
            "common/common_env.sh"
            )
for INCLUDE_FILE in "${INCLUDE_FILES[@]}"
do
    if [[ ! -f "${DIR}/${INCLUDE_FILE}" ]] ; then
        echo "File ${DIR}/${INCLUDE_FILE} is missing, aborting."
        exit 1
    fi
    source "${DIR}/${INCLUDE_FILE}"
done

ssh  -t $REMOTE_SSH_LOGIN -p $REMOTE_SSH_PORT "cd ${REMOTE_ROOT_PATH} ; exec bash"
