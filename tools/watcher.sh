#!/usr/bin/env bash

if [ ! -d "tools" ]; then cd ..; fi
. tools/colors.sh

baseDir=$(pwd)

info() {
    echo ${reset}$gray[$(date +%r)] ${cyan}${bold}INFO:${reset} $1
}

daemon() {
    chsum1=""

    while [[ true ]]
    do
        chsum2=`find ./src/web -type f -exec md5sum {} \;`
        if [[ $chsum1 != $chsum2 ]] ; then
            info "${bold}Detected changes, recompiling..."
            compile
            # restartserver
            chsum1=$chsum2
        fi
        sleep 2
    done
}

compile() {
    . tools/compile-web.sh
    info "Emitted page js files."
    node tools/compile-css.mjs
    info "Emitted css."
    # . tools/compile-server.sh
    # info "Emitted server js."
}

# restartserver() {
#     if [ ! -z $serverPID ]; then
#         kill $serverPID
#     fi

#     cd $baseDir/build
#     node server.js &
#     serverPID=$!
#     info "Server restarted."
#     cd $baseDir
# }

pnpx ts-node-dev --rs --transpile-only ./src/main.ts &

daemon
