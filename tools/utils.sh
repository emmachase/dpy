echoDivider() {
    cols=$(tput cols)
    eval "printf '=%.0s' {1..$cols}"
}
