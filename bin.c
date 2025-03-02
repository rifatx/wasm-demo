#define MSG "hello, "

void platform_write(void *buffer, int length);
void platform_read(void *buffer, int *length);

unsigned long _strlen(const char* s) {
  int l = 0;
  while (*s++) {
    l++;
  }
  return l;
}

void run() {
  char txt[20] = {0};
  int readlen = 0;

  platform_read(txt, &readlen);

  platform_write(MSG, _strlen(MSG));
  platform_write(txt, readlen);
  platform_write("\n", 1);
}
