package main

import (
	"os"
	"os/exec"
)

func main() {
	// le processus continuera ?
	cmd := exec.Command("rsync", "etc")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Run()
}
